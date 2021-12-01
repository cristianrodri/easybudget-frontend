import { createContext, Dispatch, FC, SetStateAction, useState } from 'react'

export interface ContextProps {
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const Context = createContext<ContextProps>(null)

export const GlobalContext: FC = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Context.Provider value={{ openDialog, setOpenDialog }}>
      {children}
    </Context.Provider>
  )
}
