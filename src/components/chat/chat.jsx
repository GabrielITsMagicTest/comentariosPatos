import { useState, useEffect, useRef } from 'react'
import './chat.css'

// components
import Topics from './topics/topics'
import Coments from './coments/coments'

// services
import { useSearchParams } from 'react-router-dom'
import { getComents, deleteTopic, addTopic, addComent, deleteComent } from '../../services/api/chatApi'

// hooks
import { useInitialData } from '../../hooks/chat/useInitialData'
import { usePolling } from '../../hooks/chat/usePolling'
import { UseComents } from '../../hooks/chat/useComents'

const Chat = () => {

  const [searchParams] = useSearchParams()

  let username = searchParams.get("user")
  const [inputs, setInputs] = useState({ topic: "", coment: "" })
  const [findTopic, setFindTopic] = useState("")

  // useState
  const { statusApi, setTopics, topics } = useInitialData()
  const { coments, topicID, loadingComents, fetchComents, setComents, refComents } = UseComents()
  // ref
  const refTopic = useRef(null)

  // atualizar site automaticamente
  usePolling({ topics, setTopics, topicID, coments, setComents, loadingComents, findTopic })

  const handleKey = (e, f) => {
    if (e.key == "Enter") f()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setInputs(prev => ({ ...prev, [name]: value }))
  };

  const handleAddTopic = () => {
    if (Object.keys(topics).length > 0) {
      const list_topics = Object.entries(topics[0]).map(([index, topic]) => {
        return topic
      })
      if (list_topics.includes(inputs.topic)) {
        alert("ja existe esse topic patorrice")
        return
      }
    }
    addTopic(inputs.topic, username)

    setTopics((prev) => {
      const result = [...prev]
      result.push({
        topic: inputs.topic,
        user: username
      })
      return result
    })

    setInputs(prev => ({ ...prev, topic: "" }))
  }

  const handleDeleteTopic = (topic) => {
    deleteTopic(topic, username)
    setTopics((prev) => {
      const result = [...prev].filter((topicId) => topicId.topic !== topic)
      return result
    })
  }
  // faltando fazer
  const findTopics = (zero, topics) => {
    // setFindTopic(prev => inputs.topics)
    // console.log(inputs.topic, inputs.topic == "")
    // if (inputs.topic == "") {

    // } else {

    //   console.log(33)
    //   if (zero) setTopics({})
    //   Object.entries(topics).map(([index, topic]) => {
    //     if (topic.topic.includes(inputs.topic))
    //       setTopics(prev => ({ ...prev, topic: topic.topic, user: topic }))
    //   })
    // }
  }

  const handleAddComent = () => {
    addComent(topicID, inputs.coment, username)

    setComents(prev => {
      const result = [...prev]
      result.push({
        coment: inputs.coment,
        user: username
      })
      return result
    })
    setInputs(prev => ({ ...inputs, coment: "" }))
  }

  const handleDeleteComent = (coment) => {
    console.log(coment)
    deleteComent(topicID, coment, username)
  }

  // Renderização de status
  if (statusApi === "loading") return <h1>Carregando...</h1>;
  if (statusApi === "loading_topics") return <h1>Carregando os tópicos...</h1>;
  if (statusApi === "error") return <h1>Banco de dados indisponível</h1>;
  if (statusApi === "error_db_topics") return <h1>Banco de dados não tem tópicos no momento :(</h1>;

  return (
    <div className='body'>

      <header>
        <h1>{username}:</h1>
      </header>

      <main>
        <Topics
          handleChangeTopics={(event) => handleChange({ ...event, target: { name: "topic", value: event.target.value } })}
          findTopics={findTopics}
          addTopic={handleAddTopic}
          topics={topics}
          topicsInput={inputs.topic}
          fetchComents={fetchComents}
          topicID={topicID}
          handleKey={handleKey}
          deleteTopic={handleDeleteTopic}
          username={username}
          refTopic={refTopic}
        />
        <Coments
          handleChangeComents={(event) => handleChange({ ...event, target: { name: "coment", value: event.target.value } })}
          addComent={handleAddComent}
          comentInput={inputs.coment}
          coments={coments}
          handleKey={handleKey}
          loadingComents={loadingComents}
          username={username}
          deleteComent={handleDeleteComent}
          refComents={refComents}
        />
      </main>
    </div>
  )
}

export default Chat
