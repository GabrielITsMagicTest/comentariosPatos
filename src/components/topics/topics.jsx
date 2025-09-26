import './topics.css'

function Topics({
  findTopics,
  addTopic,
  topics,
  topicsInput,
  handleChangeTopics,
  getComent,
  topicID
}) {
  return (
    <div className='topics'>
      <nav>
        <button disabled={!topicsInput} onClick={findTopics}>P</button>
        <input placeholder='procurar / criar topic' value={topicsInput} onChange={handleChangeTopics}></input>
        <button disabled={!topicsInput} onClick={addTopic}>+</button>
      </nav>

      <ul className='topics-list'>
        {topics.map((topic, index) =>
          <li key={topic}>
            <button className={topicID === topic ? "select-topic" : ""} onClick={() => getComent(topic)}>{topic}</button>
          </li>
        )}
      </ul>
    </div >)
}

export default Topics