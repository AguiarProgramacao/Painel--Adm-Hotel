import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para exibir erros de autenticação
  const [loading, setLoading] = useState(false); // Indicador de carregamento

  const API_URL = 'http://192.168.0.107:5000/api/users/login'; // Ajuste a rota conforme necessário

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, { email, password });
      const { token } = response.data;

      // Salva o token no localStorage
      localStorage.setItem('token', token);

      // Decodificar o token para verificar se o role é "admin"
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      if (decodedPayload.role !== 'admin') {
        throw new Error('Acesso negado. Apenas administradores podem acessar.');
      }

      alert('Login bem-sucedido!');
      window.location.href = '/admin/dashboard'; // Redireciona para o painel do administrador
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Credenciais inválidas ou acesso não autorizado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login do Administrador</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default AdminLogin;
