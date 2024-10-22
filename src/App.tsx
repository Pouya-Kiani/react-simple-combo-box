import { useState } from 'react'
import './App.css'
import ComboBox from './assets/components/combobox/ComboBox'

function App() {
  const [options, setOptions] = useState<string[]>([
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test7',
    'test8',
  ])

  const onAddOption = (value: string) => {
    setOptions((prev) => Array.from(new Set(prev).add(value)))
  }
  return (
    <>
      <ComboBox name="test-input" {...{ options, onAddOption }} />
    </>
  )
}

export default App
