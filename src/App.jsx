import { useState, useEffect } from 'react'
import './styles.css'

// components
import Topics from './components/topics/topics'
import Coments from './components/coments/coments'

// services
import api from './services/api/index'

function App() {
  const [coments, setComents] = useState([])
  const [inputs, setInputs] = useState({ topic: "", coment: "" })
  const [topics, setTopics] = useState([])
  const [topicID, setTopicID] = useState()
  const [statusApi, setStatusApi] = useState("loading")
  const [loadingComents, setLoadingComents] = useState("none")

  useEffect(() => {
    api.checkAvaliable()
      .then(() => {
        setStatusApi("loading_topics")
        return api.getTopics()
      }).then((data) => {
        setTopics(data.topics)
        setStatusApi("ok")

      }).catch((error) => {
        setStatusApi(prev => "loading_topics" ? "error_db_topics" : "error")
      })

  }, [])

  switch (statusApi) {
    case "loading":
      return <h1>Carregando...</h1>;
    case "loading_topics":
      return <h1>Carregando os tópicos...</h1>;
    case "error":
      return <h1>Banco de dados indisponível</h1>;
    case "error_db_topics":
      return <h1>Banco de dados não tem tópicos no momento :(</h1>;
    case "ok":
      break;
    default:
      return <h1>Status desconhecido</h1>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setInputs(prev => ({ ...prev, [name]: value }))
  };

  const addTopic = () => {
    if (topics.includes(inputs.topic)) {
      alert("ja existe esse topic patorrice")
      return
    }

    api.addTopic(inputs.topic)
    setTopics((prev) => [...prev, inputs.topic])
    setInputs(prev => ({ ...prev, topic: "" }))
  }

  // faltando fazer
  const findTopics = () => {
    if (!topics[inputs.topic]) {
      alert("nao existe esse topico")
    }
  }

  const addComent = () => {
    api.addComent(topicID, inputs.coment)

    setComents(prev => ([...coments, inputs.coment]))

    setInputs(prev => ({ ...inputs, coment: "" }))
  }

  const getComent = (id) => {
    if (topicID == id) return

    setTopicID(id)
    setLoadingComents("loading")
    api.getComent(id)
      .then((data) => {
        setLoadingComents("ok")
        setComents(data.coments)
      })
  }

  const handleKeyComents = (e) => {
    if (e.key == "Enter") addComent(topicID)
  }

  return (
    <div className='body'>
      <Topics
        handleChangeTopics={(event) => handleChange({ ...event, target: { name: "topic", value: event.target.value } })}
        findTopics={findTopics}
        addTopic={addTopic}
        topics={topics}
        topicsInput={inputs.topic}
        getComent={getComent}
        topicID={topicID}
      />

      <Coments
        handleChangeComents={(event) => handleChange({ ...event, target: { name: "coment", value: event.target.value } })}
        addComent={addComent}
        comentInput={inputs.coment}
        coments={coments}
        handleKeyComents={handleKeyComents}
        loadingComents={loadingComents}
      />
    </div>
  )
}

export default App
