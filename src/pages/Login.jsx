import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(form.email, form.senha);

    if (user.perfil === "tecnico") nav("/tecnico");
    else nav("/usuario");
  };

  return (
    <div className="container">
      <h1>HelpDesk - Login</h1>

      <form onSubmit={handleSubmit}>
        <input type="email"
          placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})}/>
        <input type="password"
          placeholder="Senha"
          onChange={(e) => setForm({...form, senha: e.target.value})}/>
        <button type="submit">Entrar</button>
      </form>

      <a href="/register">Criar conta</a>
    </div>
  );
}
