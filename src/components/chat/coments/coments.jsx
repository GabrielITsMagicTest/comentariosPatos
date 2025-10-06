import './coments.css'
import icon_delet from '../../../assets/icon-delet.png'

const Coments = ({
  handleKey,
  handleChangeComents,
  addComent,
  comentInput,
  coments,
  loadingComents,
  username,
  deleteComent
}) => {
  return (
    <div className='coments'>
      <ul className='coments-list'>
        {Object.entries(coments).map(([index, coment]) =>
          <li key={index}>
            <div className='content-coment'>
              <p>{coment.coment}</p>
              <div>
                <button disabled={!(coment.user == username)} onClick={() => {
                  deleteComent(coment.coment)
                }}>
                  <img className="coment-delet" src={icon_delet} />
                </button>
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
        {loadingComents === "ok" &&
          <div>
            <input onKeyDown={(e) => handleKey(e, addComent)} onChange={handleChangeComents} value={comentInput} placeholder='digite seu comentario'></input>
            <button disabled={!comentInput} onClick={addComent}>enviar</button>
          </div>
        }
      </nav>
    </div>

  )
}

export default Coments