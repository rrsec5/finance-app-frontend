import { ReactNode } from 'react'
import { Button } from './Button'

interface ToggleProps {
  pressed: boolean
  onPressedChange: () => void
  children: ReactNode
}

export const Toggle = ({ onPressedChange, children }: ToggleProps) => {
  return <Button onClick={onPressedChange} text={children as string} fullwidth={false} />
}