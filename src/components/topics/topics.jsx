import './topics.css'

function Topics({ findTopics, addTopic, topics, topicsInput, handleChangeTopics, getComent }) {
  return (
    <div className='topics'>
      <nav>
        <button onClick={findTopics}>P</button>
        <input placeholder='procurar / criar topic' value={topicsInput} onChange={handleChangeTopics}></input>
        <button onClick={addTopic}>+</button>
      </nav>

      <ul className='topics-list'>
        {Object.keys(topics).map((topic) =>
          <li>
            <button onClick={() => getComent(topic)}>{topic}</button>
          </li>
        )}
      </ul>
    </div>)
}

export default Topics