import { useAuth } from "../Context/AuthContext";
import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  collection,
  query,
  where,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../Services/firebase";
import { useEffect, useState } from "react";
import "../Style/User-style.css";
import MensajeForm from "./MensajeForm";
import User from "./User";
import Mensaje from "./Mensaje";

export function Home() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    await updateDoc(doc(db, "Usuario", user.uid), {
      Estado: false,
    });
  };

  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState();
  const [msj, setMsj] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "Usuario");
    // create query object
    const q = query(usersRef, where("UID", "not-in", [auth.currentUser.uid]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const SelectUsuario = (user) => {
    setChat(user);

    const user1 = auth.currentUser.uid;
    const user2 = user.UID;

    const ID = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const MensajeRef = collection(db, "Mensajes", ID, "chat");

    const q = query(MensajeRef, orderBy("Enviado_El", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msj = [];
      querySnapshot.forEach((doc) => {
        msj.push(doc.data());
      });
      setMsj(msj);
    });
  };

  console.log(msj);
  console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.UID;

    const ID = user.uid > user2 ? `${user.uid + user2}` : `${user2 + user.uid}`;
    
    await addDoc(collection(db, "Mensajes", ID, "chat"), {
      text,
      De: user.uid,
      Para: user2,
      Enviado_El: Timestamp.fromDate(new Date()),
    });
    setText("");
  };

  return (
    <div className="home_Container">
      <div className="user_Container">
        {users.map((user) => (
          <User key={user.UID} user={user} selectUsuario={SelectUsuario} />
        ))}
      </div>
      <div className="messages_container">
        <p>
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </p>
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.Nombre}</h3>
            </div>
            <div className="messages">
              {msj.length
                ? msj.map((msj, i) => <Mensaje key={i} msj={msj} user1={user.uid} />)
                : null}
            </div>
            <MensajeForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <h3 className="no_conv">Selecciona un Usuario Para Conversar</h3>
        )}
      </div>
    </div>
  );
}
