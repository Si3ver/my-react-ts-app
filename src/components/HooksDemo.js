/**
 * 使用自定义Hooks
 */

import { useCallback, useState } from "react"
import useTopics from '../hooks/useTopics'
import useDetail from '../hooks/useDetail'

export default function HooksDemo() {
  const [current, setCurrent] = useState(-1)
  const topics = useTopics()
  const detail = useDetail(undefined, [current])

  const handleClick = useCallback(id => {
    setCurrent(id)
  }, [])

  if (topics.length === 0) return (<div>loading...</div>)
  return (
    <div style={{display: 'flex'}}>
      <ul style={{width: 300, cursor: 'pointer'}}>
        {topics.map((e) => (
          <li
            key={e.id}
            onClick={() => {handleClick(e?.id)}}
            style={{backgroundColor: e.id === current ? 'lightcoral' : ''}}
          >
            {e.title}---{new Date(e.create_at).toLocaleString()}
          </li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{__html: detail?.content}}></div>
    </div>
  )
}
