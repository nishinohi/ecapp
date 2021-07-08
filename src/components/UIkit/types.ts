import { ButtonProps } from '@material-ui/core'

export interface PrimaryButtonProps extends ButtonProps {
  label: string
  onClick: () => void
}
