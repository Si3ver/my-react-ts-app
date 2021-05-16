import { useEffect, useState } from "react"

export default function useTopics(params: any, deps: number[]) {
  const [detail, setDetail] = useState({})

  useEffect(() => {
    const [current] = deps
    current !== -1 &&
      fetch(`https://cnodejs.org/api/v1/topic/${current}`)
        .then(res => res.json())
        .then(json => setDetail(json.data))
  }, deps)

  return detail
}
