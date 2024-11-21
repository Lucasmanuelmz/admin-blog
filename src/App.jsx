import Aside from "./components/aside";
import Footer from "./components/footer";
import Header from "./components/header";
import "./App.css";
import PostEditor from "./components/createPost";

export default function App() {
  return (
    <div className="grid-container">
      <Aside />
      <div className="content-container">
        <Header />
        <PostEditor />
      </div>
      <Footer />
    </div>
  );
}
