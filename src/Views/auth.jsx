import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import InputField from "../components/input";
import SubmitButton from "../components/button";

export default function LoginForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("https://api.devlucas.icu/login", userData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((err) => {
        setError("Falha no login. Verifique suas credenciais.");
        console.error(err);setTimeout(() => {
          setError('')
        },6000)
      });
  }

  return (
    <form className="login-form" aria-label="login-form" onSubmit={handleSubmit}>
      <legend className="form-title">Entre na sua conta</legend>

        <InputField
          label='Email'
          type="email"
          name="email"
          id="email"
          value={userData.email}
          onChange={handleInputChange}
          className="style-input"
          placeholder="EX: exemplo@devlucas.icu"
        />

        <InputField
         label='Senha'
         type='password'
         name='password'
         id='password'
         value={userData.password}
         onChange={handleInputChange}
         placeholder='Crie uma senha forte'
       />

      {error && <p className="error-message">{error}</p>}

      <SubmitButton type="submit" text='Entrar na conta'/>
    </form>
  );
}
