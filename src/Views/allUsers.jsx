import { useUsers } from "../store/getUsers/getUsers";
import "./index.css";

export default function UserList() {
  const users = useUsers();
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
          <th>EMAIL</th>
          <th>DATA DE INSCRIÇÃO</th>
          <th>FUNÇÃO NA PLATAFORMA</th>
          <th>EDITAR USUÁRIO</th>
          <th>APAGAR USUÁRIO</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id || 1}>
            <td>{user.id || ''}</td>
            <td>{user. firstname || ''} {user.lastname || ''}</td>
            <td>{user.email || ''}</td>
            <td>{user.createdAt || ''}</td>
            <td>{user.role || ''}</td>
            <td><a href="#">Editar usuario</a></td>
            <td><a href="#">Apagar usuario</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

