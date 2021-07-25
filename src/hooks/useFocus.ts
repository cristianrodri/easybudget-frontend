import { useEffect, useRef } from 'react'

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>()

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}
