import { useArticles } from "../store/storePosts";
import "./index.css";

export default function PostList() {
  const articles = useArticles();
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Titulo</th>
          <th>Slug</th>
          <th>Criado em</th>
          <th>Editar artigo</th>
          <th>Apagar artigo</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article.id || 1}>
            <td>{article.id || ''}</td>
            <td>{article. title || ''}</td>
            <td>{article.slug || ''}</td>
            <td>{article.createdAt || ''}</td>
            <td><a href="#">Editar artigo</a></td>
            <td><a href="#">Apagar artigo</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

