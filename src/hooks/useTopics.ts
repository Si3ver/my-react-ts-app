import { useEffect, useState } from "react"

export default function useTopics() {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    fetch('https://cnodejs.org/api/v1/topics')
      .then(res => res.json())
      .then(json => setTopics(json.data))
  }, [])

  return topics
}
