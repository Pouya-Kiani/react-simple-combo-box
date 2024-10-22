import { useEffect, useCallback, useRef } from 'react'

function useDebouncedCallback<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number) {
  const callbackRef = useRef<T>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      const handler = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [delay]
  )

  return debouncedFunction
}

export default useDebouncedCallback
