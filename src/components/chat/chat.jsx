import { useState, useEffect } from 'react'
import './chat.css'

// components
import Topics from './topics/topics'
import Coments from './coments/coments'

// services
import api from '../../services/api'
import { useSearchParams } from 'react-router-dom'

const Chat = () => {

  const [searchParams] = useSearchParams()

  let username = searchParams.get("user")
  const [coments, setComents] = useState({})
  const [inputs, setInputs] = useState({ topic: "", coment: "" })
  const [topics, setTopics] = useState({})
  const [topicID, setTopicID] = useState()
  const [statusApi, setStatusApi] = useState("loading")
  const [loadingComents, setLoadingComents] = useState("none")
  const [findTopic, setFindTopic] = useState("")
  // quando inciar o site
  useEffect(() => {
    // ver se esta diponivel o site
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

  // atualizar site automaticamente
  useEffect(() => {
    // sempre sera chamada pra atualizar a pagina
    const updateData = () => {
      // atualizar topicos
      api.getTopics()
        .then((data) => {
          if (data.topics.length != Object.keys(topics)) {
            if (!findTopic) {
              setTopics(data.topics)
            }
            else
              findTopic(false, data.topics)
          }
        })

      if (loadingComents == "ok") {
        api.getComent(topicID)
          .then((data) => {
            if (data.coments.length != Object.keys(coments)) {
              let result = {};
              result = data.coments;
              setComents(result)
            }
          })
      }
    }
    const idInterval = setInterval(updateData, 3000); // atualizar a cada 3 segundos
    return () => { clearInterval(idInterval) };

  }, [loadingComents, topics, coments, findTopic])

  // definir se ta disponivel site
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

  const handleKey = (e, f) => {
    if (e.key == "Enter") f()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setInputs(prev => ({ ...prev, [name]: value }))
  };

  const addTopic = () => {
    if (Object.keys(topics).length > 0) {
      const list_topics = Object.entries(topics[0]).map(([index, topic]) => {
        return topic
      })
      if (list_topics.includes(inputs.topic)) {
        alert("ja existe esse topic patorrice")
        return
      }
    }
    api.addTopic(inputs.topic, username)

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

  const deleteTopic = (topic) => {
    api.deleteTopic(topic, username)
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

  const addComent = () => {
    api.addComent(topicID, inputs.coment, username)

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

  const getComent = (id) => {
    id = id.topic
    if (topicID == id) return // nao executar se ja tiver selecionado

    setTopicID(id)
    setLoadingComents("loading")
    setComents({})

    // adicionar na api
    api.getComent(id)
      .then((data) => {
        setLoadingComents("ok")
        let result = {};
        result = data.coments;
        setComents(result)
      })
  }

  const deleteComent = (coment) => {
    api.deleteComent(topicID, coment, username)
  }

  return (
    <div className='body'>

      <header>
        <h1>{username}:</h1>
      </header>

      <main>
        <Topics
          handleChangeTopics={(event) => handleChange({ ...event, target: { name: "topic", value: event.target.value } })}
          findTopics={findTopics}
          addTopic={addTopic}
          topics={topics}
          topicsInput={inputs.topic}
          getComent={getComent}
          topicID={topicID}
          handleKey={handleKey}
          deleteTopic={deleteTopic}
          username={username}
        />
        <Coments
          handleChangeComents={(event) => handleChange({ ...event, target: { name: "coment", value: event.target.value } })}
          addComent={addComent}
          comentInput={inputs.coment}
          coments={coments}
          handleKey={handleKey}
          loadingComents={loadingComents}
          username={username}
          deleteComent={deleteComent}
        />
      </main>
    </div>
  )
}

export default Chat
