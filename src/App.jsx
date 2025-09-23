import { useState } from 'react'
import './styles.css'

// components
import Topics from './components/topics/topics'
import Coments from './components/coments/coments'

function App() {
  const [coments, setComents] = useState([])
  const [topics, setTopics] = useState({})
  const [topicsInput, setTopicsInput] = useState()
  const [comentInput, setComentInput] = useState()

  const [topicID, setTopicID] = useState()

  function addTopic() {
    if (topicsInput in topics) {
      alert("ja existe esse topic patorrice")
      return
    }

    setTopics((prevTopics) => {
      return { ...prevTopics, [topicsInput]: [1, 2, 3] }
    })
  }

  // faltando fazer
  function findTopics() {

  }

  function handleChangeTopics(event) {
    setTopicsInput(event.target.value)
  }

  function handleChangeComents(event) {
    setComentInput(event.target.value)
  }

  function addComent(id) {
    setComents((prevComents => {
      const cmts = [...prevComents, comentInput]

      setTopics((prevTopics) => {
        const listTopics = { ...prevTopics }
        listTopics[id] = cmts
        return listTopics
      })
      return cmts
    }))
    setComentInput("")
  }

  function getComent(id) {
    setComents([...topics[id]])
    setTopicID(id)
  }

  function handleKeyComents(e) {
    if (e.key == "Enter") addComent(topicID)
  }

  return (
    <div className='body'>
      <Topics
        findTopics={findTopics}
        addTopic={addTopic}
        topics={topics}
        topicsInput={topicsInput}
        handleChangeTopics={handleChangeTopics}
        getComent={getComent}
      />

      <Coments
        handleChangeComents={handleChangeComents}
        addComent={addComent}
        comentInput={comentInput}
        coments={coments}
        topicID={topicID}
        handleKeyComents={handleKeyComents}
      />
    </div>
  )
}

export default App
