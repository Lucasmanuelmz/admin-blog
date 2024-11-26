import { useCallback, useState, useEffect, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import axios from "axios";
import { useCategories } from "../store/getCategories/getCategories";
import { CodeElements } from "../utils/codeElement";
import { DefaultElements } from "../utils/defaultElement";
import { Leaf } from "../utils/leaf";
import TextareaField from "../components/textarea";
import InputField from "../components/input";
import SubmitButton from "../components/button";
import FileInputField from "../components/file";
import SelectField from "../components/select";
import '../App.css'
import { HeadingElement, CustomEditor, formatButtons } from "../utils/codeRitch";

export default function PostEditor({ userId }) {
  const { categories, loading } = useCategories();
  const optionCategories = categories.map(category => ({
    value: category.id,
    label: category.name
  }))
  const editor = useMemo(() => withReact(createEditor()), []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
  });
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem("content");
    return savedContent
      ? JSON.parse(savedContent)
      : [{ type: "paragraph", children: [{ text: "Escreva algo aqui..." }] }];
  });

  useEffect(() => {
    const draft = { ...formData, content };
    localStorage.setItem("draft", JSON.stringify(draft));
    localStorage.setItem("content", JSON.stringify(content));
  }, [formData, content]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.categoryId) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const submission = new FormData();
    submission.append("title", formData.title);
    submission.append("description", formData.description);
    submission.append("article", JSON.stringify(content));
    submission.append("categoryId", formData.categoryId);
    submission.append("userId", userId);
    if (file) submission.append("file", file);

    try {
      await axios.post("https://api.devlucas.icu/articles", submission, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.removeItem("draft");
      localStorage.removeItem("content");
      alert("Artigo publicado com sucesso!");

      setFormData({ title: "", description: "", categoryId: "" });
      setFile(null);
      setContent([{ type: "paragraph", children: [{ text: "Escreva algo aqui..." }] }]);
    } catch (error) {
      console.error("Erro ao publicar artigo:", error.response?.data || error.message);
      alert("Falha ao publicar o artigo. Tente novamente.");
    }
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElements {...props} />;
      case "heading":
        return <HeadingElement {...props} />;
      default:
        return <DefaultElements {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <form onSubmit={handleSubmit} className="post-container" aria-labelledby="post-form">
      <InputField
        label="Título"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Digite o título do artigo"
        required
      />

      <TextareaField
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Escreva uma breve descrição do artigo"
        required
      />

        {loading ? (
          <p>Carregando categorias...</p>
        ) : (
          <SelectField
            label='Categoria'
            labelname='Selecione uma categoria'
            id="category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
            className="input-select"
            options = {optionCategories} 
          />
        )}
        <FileInputField
          label='Adicione uma imagem'
          type="file"
          id="file"
          accept="image/*"
          onChange={handleImageChange}
          filename={file && <p>Imagem selecionada: {file.name}</p>}
        />
       
      <div className="input-controller">
        <label>Artigo</label>
        <Slate className='rich-editor' 
        editor={editor} initialValue={content} onChange={setContent}>
          <div className="editor-toolbar">
            {formatButtons.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  btn.command(editor);
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <Editable className="text-editor"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Comece a escrever..."
            spellCheck
            autoFocus
          />
        </Slate>
      </div>
      <SubmitButton type="submit" 
      disabled={loading}
      text='Publicar Artigo' />
    </form>
  );
}

