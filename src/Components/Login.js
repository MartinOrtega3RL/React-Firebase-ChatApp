import "../Style/Login-Style.css";
import "../Fonts/font-awesome-4.7.0/css/font-awesome.css";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {
    login,
    loginWithGoogle,
    resetPassword,
    loginWithFacebook,
    loginWithGithub,
    loginWithTwitter,
  } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);

      navigate("/Home");
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
          } else {
            if (error.code === "auth/user-not-found") {
              setError("El Nombre de usuario no Existe");
            } else {
              if (error.code === "auth/wrong-password") {
                setError("La contraseña es Incorrecta");
              } else {
                if (error.code === "auth/too-many-request") {
                  setError(
                    "El acceso a esta cuenta a sido inahabilitado, Tienes que cambiar inmediatamente tu contraseña o intentar mas tarde."
                  );
                }
              }
            }
          }
        }
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/Home");
    } catch (error) {
      setError(error);
    }
  };

  const handleFacebookSignin = async () => {
    try {
      await loginWithFacebook();
      navigate("/Home");
    } catch (error) {
      setError(error);
    }
  };

  const handleGithubSigin = async () => {
    try {
      await loginWithGithub();
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTwitterSigin = async () => {
    try {
      await loginWithTwitter();
      navigate("/Home");
    } catch (error) {
      console.log(error);
      setError("Usuario ya Autenticado");
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Porfavor ingresa tu Email");
    try {
      await resetPassword(user.email);
      setError("Hemos enviado un mensaje a tu Correo");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div id="Login-Box">
      <form onSubmit={handleSumbit}>
        <h1>Iniciar Sesion</h1>
        <div className="Form">
          <div className="Item">
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
          <div className="Item">
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
        <button>Iniciar Session</button>
      </form>
      <div className="P-Error">{error && <p>{error}</p>}</div>

      <div className="Redireccionar">
        <p>
          Aun no tienes una cuenta? Registrate{" "}
          <Link to="/Registrarse" className="Link">
            Aqui.
          </Link>
        </p>
      </div>

      <br></br>
      <div className="Recuperar-Item">
        <p>
          Se a olvidado su contraseña?{" "}
          <a href="#!" className="Href-Item" onClick={handleResetPassword}>
            Click aqui
          </a>{" "}
          para restablecerla
        </p>
      </div>

      <br></br>

      <div className="Cuentas">
        <p>Tambien Puedes Acceder con</p>
      </div>
      <div>
        <button onClick={handleGoogleSignin}>Google</button>
        <button onClick={handleFacebookSignin}>Facebook</button>
        <button onClick={handleTwitterSigin}>Twitter</button>
        <button onClick={handleGithubSigin}>GitHub</button>
      </div>
    </div>
  );
}
