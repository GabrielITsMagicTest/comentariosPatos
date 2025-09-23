import './coments.css'

function Coments({ handleKeyComents, handleChangeComents, addComent, comentInput, coments, topicID }) {
  return (
    <div className='coments'>
      <ul className='coments-list'>
        {coments.map((coment, index) =>
          <li>
            <p>{coment}</p>
          </li>
        )}
      </ul>

      <nav>
        <input onKeyDown={handleKeyComents} onChange={handleChangeComents} value={comentInput} placeholder='digite seu comentario'></input>
        <button disabled={!comentInput} onClick={() => addComent(topicID)}>enviar</button>
      </nav>
    </div>

  )
}

export default Coments