/* eslint-disable @typescript-eslint/ban-types */
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout

  const debounced = (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }

  debounced.cancel = () => {
    clearTimeout(timeoutId)
  }

  return debounced as ((...args: any[]) => void) & { cancel: () => void }
}

export default debounce
