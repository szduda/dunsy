import _slugify from 'slugify'

export const slugify = (value: string) =>
  _slugify(value, {
    lower: true,
    strict: true,
    locale: 'en',
  })
