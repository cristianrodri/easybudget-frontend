import { createContext, FC, useState } from 'react'
import { DialogType } from '@utils/enums'

export interface ContextProps {
  dialogOpen: boolean
  dialogMessage: string
  dialogType: DialogType
  openDialog: (message: string, type: DialogType) => void
  handleCloseDialog: () => void
}

export const Context = createContext<ContextProps>(null)

export const GlobalContext: FC = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [dialogType, setDialogType] = useState<DialogType>(null)

  const openDialog = (message: string, type: DialogType) => {
    setDialogOpen(true)
    setDialogMessage(message)
    setDialogType(type)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  return (
    <Context.Provider
      value={{
        dialogOpen,
        dialogMessage,
        dialogType,
        openDialog,
        handleCloseDialog
      }}
    >
      {children}
    </Context.Provider>
  )
}
