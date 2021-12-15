import { createContext, FC, useState } from 'react'
import { SnackbarType } from '@utils/enums'

export interface ContextProps {
  snackbarOpen: boolean
  snackbarMessage: string
  snackbarType: SnackbarType
  openSnackbar: (message: string, type: SnackbarType) => void
  handleCloseSnackbar: () => void
}

export const Context = createContext<ContextProps>(null)

export const GlobalContext: FC = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarType, setSnackbarType] = useState<SnackbarType>(null)

  const openSnackbar = (message: string, type: SnackbarType) => {
    setSnackbarMessage(message)
    setSnackbarType(type)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Context.Provider
      value={{
        snackbarOpen,
        snackbarMessage,
        snackbarType,
        openSnackbar,
        handleCloseSnackbar
      }}
    >
      {children}
    </Context.Provider>
  )
}
