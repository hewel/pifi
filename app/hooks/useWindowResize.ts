import { useState, useEffect, useCallback } from "react"

interface WindowSize {
  innerWidth: number
  innerHeight: number
  outerWidth: number
  outerHeight: number
}
type ResizeEvent = (size: WindowSize) => void

const getSize = () => ({
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  outerWidth: window.outerWidth,
  outerHeight: window.outerHeight,
})

const useWindowResize = (onResize?: ResizeEvent) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
  })

  const handleResize = useCallback(() => {
    const size = getSize()
    setWindowSize(size)
    if (onResize) {
      onResize(size)
    }
  }, [onResize])

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])
  return windowSize
}
export default useWindowResize
