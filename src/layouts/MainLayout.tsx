import type { ReactElement } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { usePageTitle } from '../hooks/usePageTitle'

export const MainLayout = ({ children }: { children: ReactElement }) => {
  const { title } = usePageTitle()
  return (
    //фиксация Sidebar слева при прокрутке сделана криво и через пень-колоду, но вроде работает
    //проверь, все ли устраивает
    <div className="flex flex-col min-h-screen bg-bg">
      <Sidebar />
      <div className="ml-[15%] w-[85%] p-6 text-text-primary">
        <div className="text-2xl font-bold font-montserrat">{title}</div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}
