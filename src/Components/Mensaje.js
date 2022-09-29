import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/es";
import { useRef, useEffect } from "react";

const Mensaje = ({ msj, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msj]);
  return (
    <div
      className={`message_wrapper ${msj.De === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msj.De === user1 ? "yo" : "amigo"}>
        {msj.text}
        <br />
        <small>
          <Moment locale="es" fromNow>
            {msj.Enviado_El.toDate()}
          </Moment>
        </small>
      </p>
    </div>
  );
};

export default Mensaje;
