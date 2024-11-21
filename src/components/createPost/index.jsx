import { useCallback, useMemo, useState, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import "./index.css";
import { CodeElements, HeadingElement } from "../../containsers/codeElements";
import { DefaultElements } from "../../containsers/defaultElements";
import { Leaf } from "../../containsers/lif";
import { CustomEditor } from "../../containsers/customization";

export default function PostEditor({ userId, categories }) {
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElements {...props} />;
      case "heading":
        return <HeadingElement />;
      default:
        return <DefaultElements {...props} />;
    }
  }, []);

  const savedDraft = useMemo(
    () => JSON.parse(localStorage.getItem("draft")) || {},
    [],
  );
  const initialContent = savedDraft.content || [
    {
      type: "paragraph",
      children: [{ text: "Escreva alguma coisa sobre seu artigo aqui..." }],
    },
  ];

  const [editor] = useState(() => withReact(createEditor()));
  const [title, setTitle] = useState(savedDraft.title || "");
  const [description, setDescription] = useState(savedDraft.description || "");
  const [category, setCategory] = useState(
    savedDraft.category || categories?.[0]?.id || "",
  );
  const [file, setFile] = useState(null);

  useEffect(() => {
    const draft = {
      title,
      description,
      category,
      content: JSON.parse(localStorage.getItem("content")) || initialContent,
    };
    localStorage.setItem("draft", JSON.stringify(draft));
  }, [title, description, category]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const article = JSON.parse(localStorage.getItem("content"));
    const postData = {
      title,
      description,
      article,
      categoryId: category,
      userId,
      file,
    };

    console.log("Dados enviados ao backend:", postData);

    localStorage.removeItem("draft");
    localStorage.removeItem("content");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="post-form"
      className="post-container"
    >
      <div className="input-controller">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título do artigo"
          required
          className="input-text"
        />
      </div>

      <div className="input-controller">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escreva uma breve descrição do artigo"
          required
          className="input-text"
        ></textarea>
      </div>

      <div className="input-controller">
        <label htmlFor="category">Categoria</label>
        <div>
        <select
          id="category"
          value={category}
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ marginTop: 10 }}
        >
          <option value='' disabled selected>Escolher categoria</option>
          {/*{categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}*/}
        </select>
        </div>
      </div>

      <div className="input-controller">
        <label htmlFor="file">Adicione uma imagem ao artigo</label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-text"
        />
        {file && <p>Imagem selecionada: {file.name}</p>}
      </div>

      <div className="input-controller">
        <label>Crie um novo artigo</label>
        <div className="rich-editor">
          <Slate
            editor={editor}
            initialValue={initialContent}
            onChange={(value) => {
              const isAstChange = editor.operations.some(
                (op) => "set_selection" !== op.type,
              );
              if (isAstChange) {
                const content = JSON.stringify(value);
                localStorage.setItem("content", content);
              }
            }}
          >
            <div>
              <button
                onMouseDown={(event) => {
                  event.preventDefault();
                  CustomEditor.toggleHeading(editor, 1);
                }}
              >
                H1
              </button>
              <button
                onMouseDown={(event) => {
                  event.preventDefault();
                  CustomEditor.toggleHeading(editor, 2);
                }}
              >
                H2
              </button>
              <button
                onMouseDown={(event) => {
                  event.preventDefault();
                  CustomEditor.toggleHeading(editor, 3);
                }}
              >
                H3
              </button>
              <button
                onMouseDown={(event) => {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                }}
              >
                B
              </button>
          
              <button
                onMouseDown={(event) => {
                  event.preventDefault();
                  CustomEditor.toggleCodeBlock(editor);
                }}
              >
                {'< >'}
              </button>
            </div>
            <Editable
              className='text-editor'
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => {
                if (!event.ctrlKey) {
                  return;
                }

                switch (event.key) {
                  case "`": {
                    event.preventDefault();
                    CustomEditor.toggleCodeBlock(editor);
                    break;
                  }
                  case "b": {
                    event.preventDefault();
                    CustomEditor.toggleBoldMark(editor);
                    break;
                  }
                }
              }}
            />
          </Slate>
        </div>
      </div>

      <div className="button-controller">
        <button type="submit" className="button">
          Publicar Artigo
        </button>
      </div>
    </form>
  );
}
