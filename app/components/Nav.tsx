import React from "react"
import { Link, useRouter } from "blitz"
import { Breadcrumbs, Link as MuiLink } from "@material-ui/core"

interface NavProps {
  hidden?: boolean
}

function Nav({ hidden = false }: NavProps) {
  const { params, route } = useRouter()
  const paths = route.split("/")
  if (hidden) {
    return null
  }
  return (
    <Breadcrumbs aria-label="breadcrumb" className="py-2">
      {route !== "/" &&
        paths.map((path, index) => {
          const isLast = index === paths.length - 1
          const isParam = /\[\w+\]/.test(path)
          const href = () => {
            if (isParam) {
              return paths.slice(0, index).join("/") + params[path.slice(1, -1)]
            } else {
              return paths.slice(0, index + 1).join("/") || "/"
            }
          }
          return (
            <MuiLink
              key={path}
              component="span"
              href={href()}
              color={isLast ? "primary" : "initial"}
            >
              <Link href={href()}>{isParam ? params[path.slice(1, -1)] : path || "Home"}</Link>
            </MuiLink>
          )
        })}
    </Breadcrumbs>
  )
}

export default Nav
