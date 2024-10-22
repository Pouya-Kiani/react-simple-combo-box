import { ComboBoxProps } from './types'

export const isControlled = (props: Omit<ComboBoxProps, 'ref'>) =>
  props?.onSelect instanceof Function
