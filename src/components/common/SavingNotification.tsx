import { useAppContext } from '@base/src/utils/useAppContext'
import { MetroSpinner } from 'react-spinners-kit'

const SavingNotification = () => {
  const { saving } = useAppContext()

  return (
    <div
      className={`flex items-center gap-[20px] transition-all ${
        saving ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p className='text-[16px]'>Saving your spreadsheet...</p>
      <MetroSpinner size={20} color='#0A0A0A' />
    </div>
  )
}

export default SavingNotification
