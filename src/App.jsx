import Aside from './containers/aside/index'
import Footer from "./containers/footer";
import Header from "./containers/header";
import "./App.css";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="grid-container">
      <Aside />
      <div className="content-container">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
