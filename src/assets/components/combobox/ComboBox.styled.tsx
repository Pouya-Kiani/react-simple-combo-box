import styled from 'styled-components'

export const SearchInput = styled.input`
  position: absolute;
  inset: 0;
  font-size: 1em;
  box-shadow: none !important;
  outline: none !important;
  border: none !important;
  background-color: transparent;
  margin-block: auto;
  padding: 0 0.5em;
`

export const DropdownMenuWrapper = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  padding: 0 1em;
  margin: 0;
  font-size: 0.8em;
  background-color: var(--paper-background);
  color: black;
  border-radius: 0.5em;
  height: auto;
  list-style: none;
`

export const DropdownMenuOptionWrapper = styled.li`
  padding: 0.5em 1em;
  border-radius: 0.5em;
  & label {
    width: 100%;
    height: 100%;
    display: inline-block;
    text-transform: capitalize;
    text-align: start;
  }
  & input[type='checkbox'] {
    display: none;
  }
  &:hover {
    background-color: var(--active-overlay);
  }
  &:has(input[type='checkbox']:checked) {
    color: var(--active-color);
    font-weight: 500;
    text-shadow: 0px 0px 1px;
  }
`

export const BadgeDisplay = styled.label`
  position: absolute;
  left: 0;
  right: 0;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 0.5em;
  margin-block: auto;
  background-color: transparent;
  text-align: start;
  font-size: 1em;
  line-height: inherit;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`
export const Badge = styled.button`
  border: none;
  outline: none !important;
  margin: 0%;
  padding: 0.25em 0.5em;
  font-size: 0.7em;
  background-color: transparent;
  border-radius: 1em;
  border: 1px solid var(--active-color);
`

export const Wrapper = styled.div.attrs<{
  $height?: string
  $rounded?: string
  $size: string
}>((props) => ({
  $height: props.$height || '48px',
  $rounded: props?.$rounded || '8px',
  $size: props?.$size || '14px',
}))`
  position: relative;
  isolation: isolate;
  display: block;
  color: black;
  & * {
    color: inherit;
    /* font-size: inherit; */
  }
  background-color: var(--paper-background);
  height: ${(props) => props.$height};
  min-width: min(350px, 80vw);
  width: 100%;
  max-width: 350px;
  border: 2px solid gray;
  border-radius: ${(props) => props.$rounded};
  font-size: ${(props) => props.$size};
  & > ${SearchInput} {
    opacity: 0;
  }
  & > ${DropdownMenuWrapper} {
    max-height: 0%;
    transition: all 0.5s;
    overflow: hidden;
    pointer-events: none;
    top: calc(${(props) => props.$height} + 0.75em);
  }
  &:has(${SearchInput}:focus,${DropdownMenuWrapper}:hover) {
    overflow: visible;
    border-color: blue;
    box-shadow: 0px 0px 3px 2px var(--active-color);
    & > ${SearchInput} {
      opacity: 1;
      /* display: initial; */
    }
    & > ${BadgeDisplay} {
      opacity: 0;
    }
    & > ${DropdownMenuWrapper} {
      max-height: 150px;
      overflow: scroll;
      pointer-events: all;
      /* min-height: 80px; */
    }
  }
  &:has(${SearchInput}:not(:placeholder-shown)) {
    overflow: visible;
    border-color: blue;
    box-shadow: 0px 0px 3px 2px var(--active-color);
    & > ${SearchInput} {
      opacity: 1;
      /* display: initial; */
    }
    & > ${BadgeDisplay} {
      opacity: 0;
    }
    & > ${DropdownMenuWrapper} {
      max-height: 150px;
      overflow: scroll;
      pointer-events: all;
      /* min-height: 80px; */
    }
  }
`
