import { useState } from 'react';
import axios from 'axios';

export default function CategoryPost({ userId }) {
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setError('A categoria não pode estar vazia.');
      return;
    }

    try {
      setError('');
      const response = await axios.post('/api/categories', {
        category,
        userId,
      });

      if (response.status === 201) {
        setSuccess('Categoria adicionada com sucesso!');
        setCategory(''); 
      }
    } catch (err) {
      setError('Erro ao adicionar categoria. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="category-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="form-container" style={{ marginBottom: '16px' }}>
        <label htmlFor="new-category" style={{ display: 'block', marginBottom: '8px' }}>
          Nova categoria
        </label>
        <input
          type="text"
          id="new-category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Digite o nome da categoria"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <input type="hidden" value={userId} />
      </div>

      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginBottom: '16px' }}>{success}</p>}

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
        Adicionar nova categoria
      </button>
    </form>
  );
}
