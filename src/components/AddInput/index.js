import { useRef } from "react"
import './index.scss'

function AddInput (props) {

  const { isInputShow } = props
  const inputRef = useRef()

  const submitValue = () => {
    const inputValue = inputRef.current.value
    console.log(inputRef.current, inputValue)

    if (inputValue.length === 0) {
      return
    }

    inputRef.current.value = ''
  }

  return (
    <>
      {
        isInputShow
        ?
        (
          <div className="input-wrapper">
            <input type="text"
              ref={inputRef}
              placeholder="请输入待办事件"
            />
            <button className="btn btn-primary"
              onClick={submitValue}
            >
              增加
            </button>
          </div>
        )
        :
        ''
      }
    </>
  )
}

export default AddInput
