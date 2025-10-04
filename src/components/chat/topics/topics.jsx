import './topics.css'
import React from 'react'

// asssets
import icon_delet from '../../../assets/icon-delet.png'
import icon_lupa from '../../../assets/icon-lupa.png'

const Topics = ({
  findTopics,
  addTopic,
  topics,
  topicsInput,
  handleChangeTopics,
  getComent,
  topicID,
  username
}) => {
  return (
    <div className='topics'>
      <nav>
        <button disabled={!topicsInput} onClick={findTopics}>
          <img src={icon_lupa} />
        </button>
        <input placeholder='procurar / criar topic' value={topicsInput} onChange={handleChangeTopics}></input>
        <button disabled={!topicsInput} onClick={addTopic}>+</button>
      </nav>

      <ul className='topics-list'>
        {Object.entries(topics).map(([index, topic]) =>
          <li key={index}>
            <div className={topicID === topic.name ? "select-topic" : ""}>
              <button className='topic-delet'>
                <img src={icon_delet} />
              </button>
              <button className='topic-name' onClick={() => getComent(topic)}>
                {topic.name}
              </button>
            </div>
            <span className='topics-autor'>to: {topic.user}</span>
          </li>
        )}
      </ul>
    </div >)
}

export default Topics