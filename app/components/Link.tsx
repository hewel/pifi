import React, { MouseEvent } from "react"
import { useRouter } from "blitz"
import { LinkProps as NextLinkProps } from "next/link"
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@material-ui/core"

type LinkProps = NextLinkProps & MuiLinkProps

const Link = ({
  children,
  href,
  as,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  onClick,
  ...props
}: LinkProps) => {
  const router = useRouter()

  const handleLinkClick = (event: MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(event)
    }
    if (prefetch) {
      router.prefetch(href)
    }
    router[replace ? "replace" : "push"](href, as, { shallow, locale })
  }
  return (
    <MuiLink onClick={handleLinkClick} {...props}>
      {children}
    </MuiLink>
  )
}

export default Link
