import { ButtonProps } from '@material-ui/core'

export interface PrimaryButtonProps extends ButtonProps {
  label: string
  onClick: () => void
}

export type SelectBoxProps = {
  label: string
  required: boolean
  value: string
  select: (value: any) => void
  options: { id: string; name: string }[]
}
