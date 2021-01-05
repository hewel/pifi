import React, { ImgHTMLAttributes, useRef, useState } from "react"
import useMergedRef from "@react-hook/merged-ref"
import { useThrottleCallback } from "@react-hook/throttle"
import useWindowResize from "app/hooks/useWindowResize"

const Poster = React.forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ alt, ...props }, ref) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const multiRef = useMergedRef(imgRef, ref)
    const [imgHeight, setImgHeight] = useState(0)

    const setHeight = useThrottleCallback(
      () => {
        if (imgRef.current) {
          setImgHeight(imgRef.current.clientWidth * 1.5)
        }
      },
      200,
      true
    )
    useWindowResize(setHeight)

    return (
      <img
        alt={alt}
        ref={multiRef}
        style={{
          height: `${imgHeight}px`,
        }}
        {...props}
      />
    )
  }
)

export default Poster
