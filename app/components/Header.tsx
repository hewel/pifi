import { AppBar, Toolbar, Typography, Container } from "@material-ui/core"
import React, { ReactNode } from "react"

interface HeaderProps {
  title?: ReactNode
}

function Header({ title }: HeaderProps) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar component={(props) => <Container maxWidth="lg" {...props} />}>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
