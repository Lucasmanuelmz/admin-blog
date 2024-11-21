export default function LoginForm() {
  return (
    <form aria-label="login-form">
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
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          className="style-input"
          placeholder="Crie uma senha forte"
        />
      </div>

      <div className="form-button">
        <button type="submit">Entrar na conta</button>
      </div>
    </form>
  );
}
