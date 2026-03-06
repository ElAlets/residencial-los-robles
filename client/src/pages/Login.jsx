import { useState } from "react";
import { login } from "../services/authService";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const data = await login(email, password);

      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";

    } catch (error) {

      alert("Login incorrecto",error);

    }

  };

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>

      </form>

    </div>
  );

}

export default Login;