import './topics.css'
import React from 'react'

// asssets
import icon_delet from '../../../assets/icon-delet.png'
import icon_lupa from '../../../assets/icon-lupa.png'
import { useTopicsScrollToLI } from '../../../hooks/chat/useTopicsScrollToLI'

const Topics = ({
  findTopics,
  addTopic,
  topics,
  topicsInput,
  handleChangeTopics,
  fetchComents,
  topicID,
  deleteTopic,
  handleKey,
  username,
  refTopic
}) => {

  useTopicsScrollToLI(refTopic, topics)
  return (
    <div className='topics'>
      <nav>
        <button onClick={() => findTopics(true, topics)}>
          <img src={icon_lupa} />
        </button>
        <input onKeyDown={(e) => handleKey(e, addTopic)} placeholder='procurar / criar topic' value={topicsInput} onChange={handleChangeTopics}></input>
        <button disabled={!topicsInput} onClick={addTopic}>+</button>
      </nav>

      <ul ref={refTopic} className='topics-list'>
        {Object.entries(topics).map(([index, topic]) =>
          <li key={index}>
            <div className={topicID === topic.topic ? "select-topic" : ""}>
              <button disabled={!(topic.user == username)} className='topic-delet' onClick={() => {
                deleteTopic(topic.topic)
              }}>
                <img src={icon_delet} />
              </button>
              <button className='topic-name' onClick={() => fetchComents(topic)}>
                {topic.topic}
              </button>
            </div>
            <span className='topics-autor'>to: {topic.user}</span>
          </li>
        )}
      </ul>
    </div >)
}

export default Topics