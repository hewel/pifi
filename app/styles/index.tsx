import { css, Global } from "@emotion/react"

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        min-height: 100vh;
      }
    `}
  />
)
