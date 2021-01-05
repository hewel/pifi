import { ReactNode } from "react"
import { Head } from "blitz"
import MuiLayout from "./MuiLayout"

export type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "pifi"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiLayout title={title}>{children}</MuiLayout>
    </>
  )
}

export default Layout
