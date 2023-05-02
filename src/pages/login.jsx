import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../services/firebase";
import Logo from "../assets/images/logo.png";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState();

  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    if (!loading) signIn(auth, data.email, data.password);
  };

  function signIn(auth, email, password) {
    setLoading(true);

    setTimeout(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("Logado com sucesso!");
          setLoading(false);
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error.message);
          alert("Usuário ou senha inválidos");
          setLoading(false);
        });
    }, 2000);
  }

  return (
    <div className="page" id="login">
      <img className="logo" src={Logo} />
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="login-form__title">Login</h4>
        <>
          <div className="input-group">
            <label>E-mail</label>
            <input {...register("email")} />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="" {...register("password")} />
          </div>
          {loading && <PulseLoader size={12} color="#20BDBD" />}

          <input value="Entrar" type="submit" />
        </>
      </form>
    </div>
  );
}
