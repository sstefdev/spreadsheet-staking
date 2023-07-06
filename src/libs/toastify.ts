import { toast } from 'react-toastify'

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'loading'

const showToast = (type: ToastType, message: string, options = {}) => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 2500,
    ...options,
  })
}

export default showToast
