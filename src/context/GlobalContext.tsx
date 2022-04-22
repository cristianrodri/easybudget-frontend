import { createContext, Dispatch, FC, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import { ActionType } from './actions'
import { ContextValues } from './types'

interface ContextType {
  values: ContextValues
  dispatch: Dispatch<ActionType>
}

export const Context = createContext({} as ContextType)

export const GlobalContext: FC = ({ children }) => {
  const [values, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider
      value={{
        values,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  )
}
