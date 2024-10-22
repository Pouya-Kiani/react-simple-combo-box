import { type ChangeEvent } from 'react'

export const targetIsCheckbox = (
  target: ChangeEvent<HTMLElement>['target']
): target is HTMLInputElement =>
  typeof (target as HTMLInputElement)?.value === 'string'
