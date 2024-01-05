import { Inter } from 'next/font/google'
import ToasterContext from './_context/ToasterContext'
import AuthContext from './_context/AuthContext'
import ActiveStatus from './_components/ActiveStatus'


import './globals.css'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext/>
          <ActiveStatus/>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
