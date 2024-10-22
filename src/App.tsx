import { FormEventHandler, useState } from 'react'
import './App.css'
import ComboBox from './assets/components/combobox/ComboBox'
import { type SelectOption } from './assets/components/combobox/types'

function App() {
  const [options, setOptions] = useState<SelectOption[]>([
    { label: 'test1-label', value: 'test1' },
    { label: 'test2-label', value: 'test2' },
    { label: 'test3-label', value: 'test3' },
    { label: 'test4-label', value: 'test4' },
    { label: 'test5-label', value: 'test5' },
    { label: 'test6-label', value: 'test6' },
    { label: 'test7-label', value: 'test7' },
    { label: 'test8-label', value: 'test8' },
  ])
  const [selected, setSelected] = useState<string[]>(['test3'])

  const onAddOption = (value: SelectOption) => {
    setOptions((prev) => Array.from(new Set(prev).add(value)))
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)

    window.alert(
      `uncontrolled input selected: ${formData.get('test-input')}\ncontrolled input selected: ${formData.get('controlled-test-input')}`
    )
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <ComboBox
          name="test-input"
          label="uncontrolled"
          {...{ options, onAddOption }}
        />
        <ComboBox
          label="controlled"
          name="controlled-test-input"
          {...{ options, onAddOption, selected, onSelect: setSelected }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App
