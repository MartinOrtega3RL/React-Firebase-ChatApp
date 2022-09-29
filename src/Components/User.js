import React from "react";
import Img from "../Assets/img/avatar.png";


const User = ({ user, selectUsuario }) => {
  //const Imagen = (user.photoURL==null) ? (Img):user.photoURL
  return (
    <div className="user_wrapper" onClick={() => selectUsuario(user)}>
      <div className="user_info">
        <div className="user_detail">
          <img src={Img} alt="avatar" className="avatar" />
          <h4>{user.Nombre}</h4>
        </div>
        <div
          className={`user_status ${user.Estado ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
  );
};

export default User;
