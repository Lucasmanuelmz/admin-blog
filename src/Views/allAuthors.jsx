import { useAuthors } from "../store/getAuthors/getAuthors";
import "./index.css";

export default function UserList() {
  const authors = useAuthors();
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
          <th>DATA DE INSCRIÇÃO</th>
          <th>EDITAR USUÁRIO</th>
          <th>APAGAR USUÁRIO</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id || 1}>
            <td>{author.id || ''}</td>
            <td>{author. firstname || ''} {user.lastname || ''}</td>
            <td>{author.createdAt || ''}</td>
            <td><a href="#">Editar autor</a></td>
            <td><a href="#">Apagar autor</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

