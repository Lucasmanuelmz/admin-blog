import { useProfile } from "../store/profileContext";

export default function UserProfile() {
  const {user} = useProfile();

  return (
    <main className="main">
      <ul>
        <li>Nome: {user.firstname}</li>
        <li>Sobrenome: {user.lastname}</li>
        <li>Email: {user.email}</li>
        <li>Telefone: {user.telphone}</li>
      </ul>
    </main>
  );
}
