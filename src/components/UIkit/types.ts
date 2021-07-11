import { ButtonProps } from '@material-ui/core'

export interface PrimaryButtonProps extends ButtonProps {
  label: string
  onClick: () => void
}

export type SelectBoxProps = {
  label: string
  required: boolean
  value: string
  select: React.Dispatch<React.SetStateAction<string>>
  options: { id: string; name: string }[]
}
