import { useState } from 'react'
import { useAuth } from '../admin'

export const useRevalidate = (initialPath: string = '') => {
  const [response, setResponse] = useState('')
  const { config } = useAuth()

  const revalidate = async (path: string = initialPath) => {
    const raw = await fetch('/foladmin/paradise/revalidate', {
      body: JSON.stringify({
        path,
        secret: config?.revalidationSecret,
      }),
      method: 'POST',
    })
    const res = await raw.text()
    setResponse(res)
  }

  return { response, revalidate }
}
