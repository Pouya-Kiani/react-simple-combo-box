export interface ComboBoxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onSelect'> {
  options: SelectOption[] | undefined
  onAddOption(value: SelectOption): void | Promise<void>
  name: string
  // selected?: OptionType[] | undefined
  // onSelect?(array: OptionType[], item?: OptionType): void
}

export type SelectOption = { label: string; value: string }

export interface DropdownMenuOptionProps extends HTMLAttributes<HTMLLIElement> {
  label: string
  value: string
  isSelected?: boolean
  selected?: string[]
  handleChange?: ChangeEventHandler<HTMLInputElement>
}
