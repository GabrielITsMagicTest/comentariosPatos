import './coments.css'

function Coments({
  handleKeyComents,
  handleChangeComents,
  addComent,
  comentInput,
  coments,
  loadingComents
}) {
  return (
    <div className='coments'>
      <ul className='coments-list'>
        {coments.map((coment, index) =>
          <li key={index}>
            <p>{coment}</p>
          </li>
        )}
        {loadingComents === "loading" &&
          <div>
            <span>carregando</span>
          </div>
        }
        {loadingComents === "none" &&
          <div>
            <span>entre em algum tópico</span>
          </div>
        }
      </ul>

      <nav>
        <input onKeyDown={handleKeyComents} onChange={handleChangeComents} value={comentInput} placeholder='digite seu comentario'></input>
        <button disabled={!comentInput} onClick={addComent}>enviar</button>
      </nav>
    </div>

  )
}

export default Coments