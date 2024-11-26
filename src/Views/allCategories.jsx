import { useCategories } from "../store/getCategories/getCategories";
import "./index.css";

export default function CategoriesList() {
  const categories = useCategories;
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome da categoria</th>
          <th>Slug da categoria</th>
          <th>Editar categoria</th>
          <th>Apagar categoria</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id || 1}>
            <td>{category.id || ''}</td>
            <td>{category.name || ''}</td>
            <td>{category.slug || ''}</td>
            <td><a href="#">Editar autor</a></td>
            <td><a href="#">Apagar autor</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

