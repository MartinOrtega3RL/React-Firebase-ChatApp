import "../Style/Registro-Style.css";
import "../Fonts/font-awesome-4.7.0/css/font-awesome.css";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link,useNavigate } from "react-router-dom";


export function Registrar() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });

    console.log(user.nombre)
  };


  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setError("Correo Invaildo");
      } else {
        if (error.code === "auth/weak-password") {
          setError("La contraseña debe tener al menos 6 caracteres ");
        } else {
          if (error.code === "auth/email-already-in-use") {
            setError("El Correo ya esta en uso");
          }
        }
      }
    }
  };

  return (
    <div id="Login-Box-R">
      <form onSubmit={handleSumbit}>
        <h1>Crear Un Nuevo Usuario</h1>
        <div className="Form-R">
          <div className="Item-R">
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="Usuario"
              required
              onChange={handleChange}
            />
          </div>
          <div className="Item-R">
            <i className="fa fa-key" aria-hidden="true"></i>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              id="Contraseña"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <button>Registrarse</button>
      </form>
      <div className="P-Error-R">{error && <p>{error}</p>}</div>
      <div className="Redireccionar-R">
        <p>Ya tienes una cuenta? <Link to="/" className="Link">Inicia Sesion Aqui.</Link></p>
      </div>
    </div>
  );
}
