import './coments.css'

const Coments = ({
  handleKeyComents,
  handleChangeComents,
  addComent,
  comentInput,
  coments,
  loadingComents
}) => {
  return (
    <div className='coments'>
      <ul className='coments-list'>
        {Object.entries(coments).map(([index, coment]) =>
          <li key={index}>
            <div className='content-coment'>
              <p>{coment.coment}</p>
              <div>
                <span>:{coment.user}</span>
              </div>
            </div>
          </li>
        )}

        {loadingComents === "loading" &&
          <div className='coments-loading'>
            <span>carregando...</span>
          </div>
        }
        {loadingComents === "none" &&
          <div className='coments-loading'>
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