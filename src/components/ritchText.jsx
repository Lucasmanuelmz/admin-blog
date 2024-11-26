import { useCallback, useMemo, useState, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { CodeElements } from "../utils/codeElement";
import { DefaultElements } from "../utils/defaultElement";
import { Leaf } from "../utils/leaf";
import { HeadingElement, formatButtons } from "../utils/codeRitch";

export default function RitchTextEditor({name, label, onSubmit, initialContent, userId }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [content, setContent] = useState(
    initialContent || [{ type: "paragraph", children: [{ text: "Escreva algo aqui..." }] }]
  );

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Usuário não identificado.");
      return;
    }

    try {
      const response = await onSubmit(content);
      alert("Conteúdo enviado com sucesso!");
      console.log("Resposta da API:", response);
    } catch (error) {
      console.error("Erro ao enviar conteúdo:", error.response?.data || error.message);
      alert("Erro ao enviar. Verifique os campos e tente novamente.");
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
    <form onSubmit={handleSubmit} className="editor-container post-container">
      
        <label htmlFor={name}>{label}</label>
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
      <Slate editor={editor} initialValue={content} onChange={setContent}>
        <Editable
          className="text-editor"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Comece a escrever..."
          spellCheck
          autoFocus
        />
      </Slate>
      
      <button style={{marginTop: 25}} type="submit" className="submit-button">Salvar Conteúdo</button>
    </form>
  );
}
