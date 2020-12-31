import React, { ReactNode } from "react"
import { Container } from "@material-ui/core"
import Header from "../components/Header"
import Nav from "../components/Nav"

interface MuiLayoutProps {
  title?: string
  children: ReactNode
  isNavHidden?: boolean
}

function MuiLayout({ isNavHidden, title, children }: MuiLayoutProps) {
  return (
    <>
      <Header title={title} />
      <Container maxWidth="lg">
        <Nav hidden={isNavHidden} />
        {children}
      </Container>
    </>
  )
}

export default MuiLayout
