import { ChangeEvent, useState } from 'react'

export const useInputText = () => {
  const [text, setText] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value)
  }

  const emptyText = () => {
    setText('')
  }

  return { text, setText, handleChange, emptyText }
}
