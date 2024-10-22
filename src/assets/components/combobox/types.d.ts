export interface ComboBoxProps<OptionType = string>
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onSelect'> {
  options: OptionType[] | undefined
  onAddOption(value: OptionType): void | Promise<void>
  name: string
  // selected?: OptionType[] | undefined
  // onSelect?(array: OptionType[], item?: OptionType): void
}

export type SelectOption = string

export interface DropdownMenuOptionProps extends HTMLAttributes<HTMLLIElement> {
  value: string
  isSelected?: boolean
  selected?: string[]
  handleChange?: ChangeEventHandler<HTMLInputElement>
}
