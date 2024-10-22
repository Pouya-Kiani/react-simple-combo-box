import {
  type ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from 'react'
import { ComboBoxProps, DropdownMenuOptionProps } from './types'
import useDebouncedCallback from '../../hooks/useDebouncedCallback'
import {
  Badge,
  BadgeDisplay,
  DropdownMenuOptionWrapper,
  DropdownMenuWrapper,
  SearchInput,
  Wrapper,
} from './ComboBox.styled'
import { targetIsCheckbox } from '../../utils/typeUtils'

export default forwardRef<HTMLInputElement, ComboBoxProps>(
  function ComboBox(props, ref) {
    const inputRef = useRef<HTMLInputElement>(null)
    const searchBoxRef = useRef<HTMLInputElement>(null)

    const { name, options, onAddOption, ...inputProps } = props as ComboBoxProps

    const [searchKeyword, setSearchKeyword] = useState<string>('')
    const [selected, setSelected] = useState<string[]>([])

    // handlers
    const handleSelect = (value: string) => {
      setSelected((prev) => Array.from(new Set(prev).add(value)))
    }
    const handleDeselect = (value: string) =>
      setSelected((prev) => {
        console.log(prev)
        const selectedSet = new Set(prev)
        selectedSet.delete(value)
        return Array.from(selectedSet)
      })

    const handleSelectOption: ChangeEventHandler<HTMLUListElement> = (
      event
    ) => {
      if (!targetIsCheckbox(event.target)) return
      if (!inputRef?.current) {
        console.warn('input ref not found. ', name)
        return
      }
      const { value, checked } = event.target
      if (checked) handleSelect(value)
      else handleDeselect(value)
    }

    const isSelected = (value?: string) =>
      value ? new Set(selected).has(value) : false

    const focus = searchBoxRef.current?.focus
    // @ts-expect-error ToDo: update tslint rules
    useImperativeHandle(ref, () => {
      return { ...inputRef.current, focus, value: selected.join(',') }
    })

    const handleSearch = useDebouncedCallback<
      ChangeEventHandler<HTMLInputElement>
    >((event) => {
      setSearchKeyword(event?.target?.value || '')
    }, 1000)

    const filteredOptions = useMemo(() => {
      if (!options?.length) return []
      if (!searchKeyword) return options
      return options.filter(({ value }) => value.includes(searchKeyword))
    }, [options, searchKeyword])

    const handleAddOption = (value: string) => {
      if (!onAddOption) {
        console.warn('onAddOption is not a valid function, component: ', name)
        return
      }
      onAddOption({ label: value, value })
      handleSelect(value)
      if (searchBoxRef.current) searchBoxRef.current.value = ''
      setSearchKeyword('')
    }
    return (
      <Wrapper $size="18px">
        <input
          type="hidden"
          name={name}
          ref={inputRef}
          {...inputProps}
          onFocus={() => focus?.()}
        />
        <SearchInput
          id="searchBoxRef"
          ref={searchBoxRef}
          aria-autocomplete="list"
          role="combobox"
          aria-haspopup
          aria-expanded
          aria-controls="options"
          onChange={handleSearch}
          placeholder=" "
        />
        <BadgeDisplay htmlFor="searchBoxRef">
          {selected?.length
            ? selected
                .filter((_, index) => index > selected.length - 3)
                .map((option, idx) => (
                  <Badge
                    key={`input-${name}-option-badge-${idx}`}
                    onClick={(e) => {
                      console.log(e, option)
                      e.stopPropagation()
                      handleDeselect(option)
                    }}
                  >
                    {option}
                  </Badge>
                ))
            : 'Label'}
        </BadgeDisplay>
        <DropdownMenuWrapper
          id={'options'}
          role="listbox"
          tabIndex={0}
          aria-multiselectable
          onChange={handleSelectOption}
        >
          {filteredOptions?.length ? (
            filteredOptions.map(({ label, value }) => (
              <DropdownMenuOption
                label={label}
                value={value}
                isSelected={isSelected(value)}
                selected={selected}
                key={`option-${value}`}
                // handleChange={handleSelectItem}
              />
            ))
          ) : (
            <DropdownMenuOptionWrapper>
              <span
                onClick={() => {
                  handleAddOption?.(searchKeyword)
                }}
              >
                {searchKeyword} not found, Add+
              </span>
            </DropdownMenuOptionWrapper>
          )}
        </DropdownMenuWrapper>
      </Wrapper>
    )
  }
)

export function DropdownMenuOption({
  value,
  isSelected,
  label,
  ...componentProps
}: DropdownMenuOptionProps) {
  return (
    <DropdownMenuOptionWrapper role="option" {...componentProps}>
      <label>
        <input
          type="checkbox"
          // defaultChecked={selected?.includes(value)}
          checked={isSelected}
          onChange={() => {}}
          value={value}
          id={`option-${value}`}
        />
        {label}
      </label>
    </DropdownMenuOptionWrapper>
  )
}
