/**
 * useRef
 */

import React, { useEffect, useRef } from "react"

// function Input() {
//   const inputRef = useRef()

//   useEffect(() => {
//     console.log('mount')
//     inputRef.current.focus()
//   }, [])

//   return <input ref={inputRef} />
// }

const FInput = React.forwardRef((props, ref) => {
  return <input {...props} ref={ref} />
})

export default function RefDemo() {

  const fInputRef = useRef()
  useEffect(() => {
    fInputRef.current.focus()
    fInputRef.current.value = 'hello, world'
  }, [])

  return (
    <div>
      {/* <Input /> */}
      <FInput ref={fInputRef} placeholder="input..." />
    </div>
  )
}
