import logo from "../../assets/logo.png";
import foto_de_perfil from "../../assets/foto_de_perfil.jpg";
import {
  MdSpaceDashboard,
  MdCategory,
  MdAdminPanelSettings,
} from "react-icons/md";
import { FaSignsPost } from "react-icons/fa6";
import { SiLibreofficewriter } from "react-icons/si";
import { HiMiniUsers } from "react-icons/hi2";
import "./index.css";

export default function Aside() {
  return (
    <aside className="aside" aria-label="Dashboard aside">
      <img className="logo" src={logo} alt="Icone da empresa" />
      <figure className="figure" aria-label="Foto de usuario">
        <img
          className="photo"
          src={foto_de_perfil}
          alt="Foto de perfil do usuario"
        />
      </figure>
      <div className="navbar-container">
        <span className="dashboard">
          <MdSpaceDashboard data-testid="icon" />
          <a href="#">Dashboard</a>
        </span>
        <nav className="aside-navbar">
          <span>
            <FaSignsPost data-testid="icon" />
            <a href="articles/list">Posts</a>
          </span>
          <ul className="list list-hidden">
            <li>
              <a href='/user/:userId/create/article'>Criar novo post</a>
            </li>
            <li>
              <a href="article/:id/update">Editar o post</a>
            </li>
          </ul>
        </nav>
        <nav className="aside-navbar">
          <span>
            <MdCategory data-testid="icon" />
            <a href="categories">Categorias</a>
          </span>
          <ul className="list list-hidden">
            <li>
              <a href="create/category'">Criar nova categoria</a>
            </li>
            <li>
              <a href="category/:id/update">Editar categoria</a>
            </li>
          </ul>
        </nav>
        <nav className="aside-navbar">
          <span>
            <SiLibreofficewriter data-testid="icon" />
            <a href="#">Autores</a>
          </span>
          <ul className="list list-hidden">
            <li>
              <a href={`user/:userid/become/author`}>Torna se autor</a>
            </li>
            <li>
              <a href="#">Editar autor</a>
            </li>
          </ul>
        </nav>
        <nav className="aside-navbar">
          <span>
            <HiMiniUsers data-testid="icon" />
            <a href="users">Usuarios</a>
          </span>
          <ul className="list list-hidden">
            <li>
              <a href="#">Adicionar usuario</a>
            </li>
            <li>
              <a href="user/:id/update">Editar usuario</a>
            </li>
          </ul>
        </nav>
        <nav className="aside-navbar">
          <span>
            <MdAdminPanelSettings data-testid="icon" />
            <a href="profile">Administradores</a>
          </span>
        </nav>
      </div>
    </aside>
  );
}
