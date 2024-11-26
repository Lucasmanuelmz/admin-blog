import InputField from '../components/input';
import SubmitButton from '../components/button';
import { UserProvider, useUser } from '../store/getUsers/getUser';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function RenderingUser() {
  const { id } = useParams();
  return (
    <UserProvider id={id}>
      <UpdateUser />
    </UserProvider>
  );
}

export default function UpdateUser() {
  const { user, loading, error } = useUser();
  const { id } = useParams();

  const [updateUser, setUpdateUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telphone: ''
  });

  useEffect(() => {
    if (user) {
      setUpdateUser({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        telphone: user.telphone || ''
      });
    }
  }, [user]);

  function handleUpdate(e) {
    const { name, value } = e.target;
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handleUpdatedSubmit(e) {
    e.preventDefault();

    axios
      .put(`https://api.devlucas.icu/users/${id}`, updateUser)
      .then(() => {
        console.log('Usuário atualizado com sucesso!');
      })
      .catch((error) => {
        console.log('Erro ao atualizar usuário:', error.message);
      });
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados do usuário: {error.message}</p>;

  return (
    <form onSubmit={handleUpdatedSubmit} className="update-form">
      <legend className="form-title">Atualizar seus dados de usuário</legend>
      <InputField
        label="Nome"
        type="text"
        name="firstname"
        id="firstname"
        value={updateUser.firstname}
        onChange={handleUpdate}
      />
      <InputField
        label="Sobrenome"
        type="text"
        name="lastname"
        id="lastname"
        value={updateUser.lastname}
        onChange={handleUpdate}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        id="email"
        value={updateUser.email}
        onChange={handleUpdate}
      />
      <InputField
        label="Telefone"
        type="tel"
        name="telphone"
        id="telphone"
        value={updateUser.telphone}
        onChange={handleUpdate}
      />
      <SubmitButton type="submit" text="Atualizar minha conta" />
    </form>
  );
}
