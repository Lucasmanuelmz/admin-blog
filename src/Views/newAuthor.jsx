import axios from "axios";
import InputField from "../components/input";
import RitchTextEditor from "../components/ritchText";
import { useState } from "react";

export default function AuthorForm() {
  const [author, setAuthor] = useState({
    firstname: "",
    lastname: "",
    bio: "",
  });

  const [bioContent, setBioContent] = useState([
    { type: "paragraph", children: [{ text: "Escreva uma biografia..." }] }]);

  function handleChangeName(e) {
    const { name, value } = e.target;
    setAuthor((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!author.firstname || !author.lastname || !bioContent) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("https://api.devlucas.icu/authors", {
        firstname: author.firstname,
        lastname: author.lastname,
        bio: bioContent,
      });

      alert("Autor criado com sucesso!");
      console.log(response.data);

      setAuthor({ firstname: "", lastname: "", bio: "" });
      setBioContent([{ type: "paragraph", children: [{ text: "Escreva uma biografia..." }] }]);
    } catch (error) {
      console.error("Erro ao criar autor:", error.response?.data || error.message);
      alert("Falha ao criar autor. Tente novamente.");
    }
  }

  return (
    <form style={{
      maxWidth: 500,
      margin: 'auto',
      marginTop: 20
    }} onSubmit={handleSubmit}>
      <legend className="form-title">Torne-se um autor</legend>
      <InputField
        label="Nome"
        type="text"
        placeholder="Digite um nome para o público conhecer o autor"
        name="firstname"
        value={author.firstname}
        onChange={handleChangeName}
        id="firstname"
        required
      />

      <InputField
        label="Sobrenome"
        type="text"
        placeholder="Digite um sobrenome para o público conhecer o autor"
        name="lastname"
        value={author.lastname}
        onChange={handleChangeName}
        id="lastname"
        required
      />

      <RitchTextEditor
        label='Biografia'
        name="bio"
        userId={"123"}
        initialContent={bioContent}
        onSubmit={(content) => setBioContent(content)}
      />
    </form>
  );
}
