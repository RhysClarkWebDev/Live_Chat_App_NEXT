import type { Metadata } from 'next'
import AuthForm from '../_components/AuthForm'

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: '',
}

export default function Home() {
  return (
    <div
    className="
    flex
    min-h-full
    flex-col
    justify-center
    py-15
    sm:px-6
    lg:px-8
    bg-gray-100
    "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 
        className="
          text-center
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
        "
        >
          Sign in to your account
        </h1>
      </div>
      <AuthForm/>
    </div>
  )
}
