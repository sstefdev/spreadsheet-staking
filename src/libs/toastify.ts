import { toast, ToastOptions } from 'react-toastify'

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'loading'

const showToast = (
  type: ToastType,
  message: string,
  options: ToastOptions = {},
): Promise<string> => {
  return new Promise((resolve) => {
    const toastOptions: ToastOptions = {
      position: 'top-right',
      ...options,
      onOpen: (currentToast: any) => resolve(currentToast.toastId),
    }

    toast[type](message, toastOptions)
  })
}

export default showToast
