export default function SignupForm() {
  return (
    <form aria-label="signup-form">
      <div className="form-container">
        <label htmlFor="firstname">Nome</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="style-input"
          placeholder="Primeiro nome"
        />
      </div>
      <div className="form-container">
        <label htmlFor="lastname">Sobrenome</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="style-input"
          placeholder="Seu último nome"
        />
      </div>
      <div className="form-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="style-input"
          placeholder="EX: exemplo@devlucas.icu"
        />
      </div>
      <div className="form-container">
        <label htmlFor="telephone">Tel</label>
        <input
          type="tel"
          name="telphone"
          id="telephone"
          className="style-input"
          placeholder="+258 82 667 452"
        />
      </div>
      <div className="form-container">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          className="style-input"
          placeholder="Crie uma senha forte"
        />
      </div>
      <div className="form-container">
        <label htmlFor="repeat-password">Confirmar senha</label>
        <input
          type="password"
          name="repeatPassword"
          id="repeat-password"
          className="style-input"
          placeholder="Repita a senha neste espaço"
        />
      </div>
      <div className="form-container">
        <label htmlFor="role">Selecione seu cargo</label>
        <select name="role" id="role">
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
          <option value="author">Autor</option>
        </select>
      </div>
      <div className="form-button">
        <button type="submit">Enviar formulário</button>
      </div>
    </form>
  );
}
