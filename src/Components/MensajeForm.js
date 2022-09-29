

const MensajeForm = ({ handleSubmit, text, setText,}) => {
    return (
      <form className="message_form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Ingrese Un Mensaje"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button className="btn"><span className="text">Enviar</span></button>
        </div>
      </form>
    );
  };

export default MensajeForm;
