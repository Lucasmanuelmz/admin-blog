import { useState } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function PostEditor({ userId, categories }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories?.[0]?.id || '');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const article = convertToRaw(editorState.getCurrentContent());
    const postData = {
      title,
      description,
      article,
      categoryId: category,
      userId,
      image,
    };

    console.log('Dados enviados ao backend:', postData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label='post-form' style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título do artigo"
          required
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '4px',
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          name='description'
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escreva uma breve descrição do artigo"
          required
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '4px',
          }}
        ></textarea>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          value={category}
          name='category'
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '4px',
          }}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label  htmlFor='file'>Adicione uma imagem ao artigo</label>
        <input
          type="file"
          name='file'
          id='file'
          accept="image/*"
          onChange={handleImageChange}
          style={{
            marginTop: '4px',
          }}
        />
        {image && <p>Imagem selecionada: {image.name}</p>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor='content'>Crieu novo artigo</label>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            minHeight: '150px',
            cursor: 'text',
          }}
        >
          <Editor
            id='content'
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Escreva o conteúdo do artigo aqui..."
          />
        </div>
      </div>

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Publicar Artigo
      </button>
    </form>
  );
};

