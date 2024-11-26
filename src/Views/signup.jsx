import axios from "axios";
import { useState } from "react";
import './auth'
import InputField from "../components/input";
import SubmitButton from "../components/button";
import SelectField from "../components/select";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telphone: "",
    password: "",
    repeatPassword: "",
    role: "user", 
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError("As senhas não coincidem!");
      setTimeout(() => {setError('')}, 6000)
      return;
    }

    setError(""); 
    setSuccess(""); 

    axios
      .post("https://api.devlucas.icu/users", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        telphone: formData.telphone,
        password: formData.password,
        role: formData.role,
      })
      .then(() => {
        setSuccess("Cadastro realizado com sucesso!");
        setTimeout(() => {
          setSuccess('')
        }, 3000)
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          telphone: "",
          password: "",
          repeatPassword: "",
          role: "user",
        });
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Ocorreu um erro ao enviar os dados."
        );
        setTimeout(()=> {
          setError('')
        }, 6000)
      });
  }

  return (
    <form className="signup-form" aria-label="signup-form" onSubmit={handleSubmit}>
      <legend className="form-title">Crie uma conta de usuario</legend>
        <InputField
          label='Nome'
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          placeholder="Primeiro nome"
          required
        />

        <InputField
          label='Sobrenome'
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          placeholder="Seu último nome"
          required
        />
        <InputField
          label='Email'
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="EX: exemplo@devlucas.icu"
          required
        />

        <InputField
         label='Tel'
          type="tel"
          name="telphone"
          id="telephone"
          value={formData.telphone}
          onChange={handleInputChange}
          placeholder="+258 82 667 452"
          required
        />
    
        <InputField
          label='Senha'
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Crie uma senha forte"
          required
        />

        <InputField
          label='Confirmar senha'
          type="password"
          name="repeatPassword"
          id="repeat-password"
          value={formData.repeatPassword}
          onChange={handleInputChange}
          placeholder="Repita a senha neste espaço"
          required
        />

       <SelectField
        label="Selecione uma categoria"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        options={[
         { value: 'user', label: 'Usuário' },
         { value: 'admin', label: 'Administrador' },
         { value: 'author', label: 'Autor' }
        ]}
        required
       />

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <SubmitButton type="submit" text='Enviar formulário'/>
    </form>
  );
}
