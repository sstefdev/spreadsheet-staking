import { useContext } from 'react'
import { StakingAppContext } from './context'

export const useAppContext = () => {
  const appContext = useContext(StakingAppContext)

  if (!appContext) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }

  return appContext as IAppContextState
}
