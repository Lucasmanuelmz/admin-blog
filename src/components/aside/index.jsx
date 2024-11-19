import logo from '../../assets/logo.png';
import foto_de_perfil from '../../assets/foto_de_perfil.jpg';
import { MdSpaceDashboard, MdCategory, MdAdminPanelSettings } from "react-icons/md";
import { FaSignsPost } from "react-icons/fa6";
import { SiLibreofficewriter } from "react-icons/si";
import { HiMiniUsers } from "react-icons/hi2";

export default function Aside() {
  return(
    <aside aria-label='Dashboard aside'>
      <img src={logo} alt="Icone da empresa" />
      <figure aria-label='Foto de usuario'>
        <img src={foto_de_perfil} alt="Foto de perfil do usuario" />
      </figure>
      <div>
      <span><MdSpaceDashboard data-testid='icon' /><a href="#">Home</a></span>
     <nav>
      <span><FaSignsPost data-testid='icon' /><a href="#">Posts</a></span>
      <ul>
        <li><a href="#">Criar novo post</a></li>
        <li><a href="#">Editar o post</a></li>
      </ul>
     </nav>
     <nav>
      <span><MdCategory data-testid='icon' /><a href="#">Categorias</a></span>
      <ul>
        <li><a href="#">Criar nova categoria</a></li>
        <li><a href="#">Editar categoria</a></li>
      </ul>
     </nav>
     <nav>
     <span><SiLibreofficewriter data-testid='icon' /><a href="#">Autores</a></span> 
      <ul>
        <li><a href="#">Adicionar autor</a></li>
        <li><a href="#">Editar autor</a></li>
      </ul>
     </nav>
     <nav>
      <span><HiMiniUsers data-testid='icon' /><a href="#">Usuarios</a></span>
      <ul>
        <li><a href="#">Adicionar usuario</a></li>
        <li><a href="#">Editar usuario</a></li>
      </ul>
     </nav>
     <nav>
      <span><MdAdminPanelSettings data-testid='icon' /><a href="#">Administradores</a></span>
      <ul>
        <li><a href="#">Perfil</a></li>
      </ul>
     </nav>
    </div>
    </aside>
  )
}
