import React from "react"
import clsx from "clsx"
import { useRouter } from "blitz"
import { Breadcrumbs, Typography } from "@material-ui/core"
import Link from "app/components/Link"

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
          const name = isParam ? params[path.slice(1, -1)] : path || "Home"
          const href = () => {
            if (isParam) {
              return paths.slice(0, index).join("/") + params[path.slice(1, -1)]
            } else {
              return paths.slice(0, index + 1).join("/") || "/"
            }
          }
          return isLast ? (
            <Typography>{name}</Typography>
          ) : (
            <Link
              key={path}
              className={clsx("cursor-pointer")}
              href={href()}
              color={isLast ? "primary" : "initial"}
            >
              {name}
            </Link>
          )
        })}
    </Breadcrumbs>
  )
}

export default Nav
