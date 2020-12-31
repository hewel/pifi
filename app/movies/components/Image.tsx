import React, { ImgHTMLAttributes, RefObject } from "react"

const Image = React.forwardRef(
  ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>, ref: RefObject<HTMLImageElement>) => {
    return <img alt={alt} ref={ref} {...props} />
  }
)
export default Image
