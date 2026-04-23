import "./style.css"
import Gradient from "./shederGradient"

export default function RootLayout({ children }) {
  return (
    <html lang='pt-br'>
        <body>
            <Gradient />
            {children}
        </body>
    </html>
  )
}
