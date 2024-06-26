import { db } from '@/firebase'
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  DocumentSnapshot,
} from 'firebase/firestore/lite'
import { DbSnippet, Snippet, SnippetCard } from './types'
import { addDrums, updateDrums } from './drums.api'
import { addPattern, updatePatterns } from './pattern.api'
import { validate } from './validate'

const DRUMS_COLLECTION = 'drums'

export const readSnippets = () => {
  const raw = localStorage.getItem('cards')
  if (!raw) return []

  return JSON.parse(raw) as SnippetCard[]
}

export const writeSnippets = (cards: SnippetCard[]) => {
  localStorage.setItem('cards', JSON.stringify(cards))
  localStorage.setItem('lastFetchAt', JSON.stringify(Date.now()))
}

type Options = { limit: number; includeDrafts: boolean }

const defaultOptions: Options = {
  limit: 5,
  includeDrafts: false,
}

export const getSnippets = async (
  search?: string,
  options: Partial<Options> = {}
) => {
  const _options = { ...defaultOptions, ...options }
  try {
    const col = collection(db, DRUMS_COLLECTION)
    const filters = []

    if (search) {
      filters.push(where('tags', 'array-contains', search.toLowerCase().trim()))
    }

    if (!options.includeDrafts) {
      filters.push(where('published', '==', true))
    }

    const response = await getDocs(
      query(
        col,
        ...filters,
        orderBy('createdAt', 'desc'),
        limit(_options.limit)
      )
    )

    const results: SnippetCard[] = response.docs.map((doc) => {
      const { title, slug, tags, createdAt, updatedAt, authorUid, published } =
        doc.data()
      return {
        id: doc.id,
        title,
        slug,
        tags,
        authorUid,
        lastModified:
          Math.round(updatedAt?.seconds / 60) * 60000 ||
          Math.round(createdAt?.seconds / 60) * 60000 ||
          0,
        published,
      }
    })
    return results
  } catch (error) {
    console.error('Error caught:\n', error)
  }

  return []
}

export const getRecentlyAdded = async (options = { limit: 4 }) => {
  const _query = query(
    collection(db, DRUMS_COLLECTION),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(options.limit)
  )

  const response = await getDocs(_query)

  const results: SnippetCard[] = response.docs.map((doc) => {
    const { title, slug, tags, authorUid } = doc.data()
    return {
      id: doc.id,
      title,
      slug,
      tags,
      authorUid,
    }
  })

  return results
}

export const getSnippet = async (id: string) => {
  const raw = await getDoc(doc(db, DRUMS_COLLECTION, id))
  return await parseSnippet(raw)
}

export const getSnippetBySlug = async (slug: string) => {
  const col = collection(db, DRUMS_COLLECTION)
  const response = await getDocs(
    query(col, where('slug', '==', slug), limit(1))
  )

  if (response.empty) {
    return null
  }

  return parseSnippet(response.docs[0])
}

export const addSnippet = async (data: Snippet) => {
  const {
    title,
    slug,
    tags,
    patterns,
    description,
    swing,
    signal,
    tempo,
    authorUid,
  } = data

  const messages = validate(data)
  if (messages.length > 0) {
    return { messages }
  }

  const patternsRefs = (await Promise.all(
    Object.keys(patterns)
      .map(
        (instrument) =>
          instrument &&
          patterns[instrument] &&
          addPattern({
            instrument,
            title: instrument,
            pattern: patterns[instrument],
            authorUid,
          })
      )
      .filter(Boolean)
  )) as DocumentReference[]

  const snippet = await addDrums({
    title,
    slug,
    ...(description ? { description: description } : {}),
    ...(signal ? { signal: signal } : {}),
    ...(swing ? { swing: swing } : {}),
    ...(tempo ? { tempo: Number(tempo) } : {}),
    tags: tags.split(',').map((tag: string) => tag.trim()),
    patterns: patternsRefs,
    authorUid,
  })

  if (snippet?.id) {
    return {
      messages: ['Snippet added'],
      ok: true,
    }
  }

  return {
    messages: ['Off you go. The rhythm vault is closed today.'],
  }
}

export const updateSnippet = async (data: Snippet, patternsDirty: boolean) => {
  const { title, slug, tags, description, swing, signal, tempo } = data

  if (!data.id) {
    throw new Error('Missing id param in data')
  }

  const messages = validate(data)
  if (messages.length > 0) {
    return { messages }
  }

  const document = await getDoc(doc(db, DRUMS_COLLECTION, data.id))
  const existingData = document.data() as DbSnippet
  const tagsArray = tags.split(',').map((tag: string) => tag.trim())

  const newPatterns =
    patternsDirty && (await updatePatterns(existingData, data.patterns))

  const success = await updateDrums(document.ref, {
    ...(title && title !== existingData.title ? { title } : {}),
    ...(slug && slug !== existingData.slug ? { slug } : {}),
    ...(description !== existingData.description ? { description } : {}),
    ...(signal !== existingData.signal ? { signal } : {}),
    ...(swing !== existingData.swing ? { swing } : {}),
    ...(tempo !== String(existingData.tempo || 0)
      ? { tempo: Number(tempo) }
      : {}),
    ...(tagsArray.join() !== existingData.tags.join()
      ? { tags: tagsArray }
      : {}),
    ...(newPatterns ? { patterns: newPatterns } : {}),
  })

  if (success) {
    return {
      messages: ['Snippet updated'],
      ok: true,
    }
  }

  return {
    messages: ['Off you go. The rhythm vault is closed today.'],
  }
}

async function parseSnippet(raw: DocumentSnapshot): Promise<Snippet> {
  const { tempo: rawTempo, ...rawData } = raw.data() as DbSnippet
  const rawPatterns = await Promise.all(
    (rawData?.patterns ?? [])
      .filter(Boolean)
      .map(async (patternRef: DocumentReference) => await getDoc(patternRef))
  )

  return {
    ...rawData,
    ...(rawTempo ? { tempo: String(rawTempo) } : {}),
    tags: rawData?.tags.join(', ') ?? '',
    patterns: rawPatterns.reduce((acc, current) => {
      const { instrument, pattern } = current.data() ?? {}
      return { ...acc, [instrument]: pattern }
    }, {}),
  }
}
