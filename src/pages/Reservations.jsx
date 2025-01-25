import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [error, setError] = useState(null); // Estado para erros

  const API_URL = 'http://192.168.0.107:5000/api/bookings/';

  // Função para buscar as reservas
  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Supondo que o token de autenticação esteja no localStorage
        },
      });
      setReservations(response.data);
    } catch (err) {
      console.error('Erro ao buscar reservas:', err);
      setError('Não foi possível carregar as reservas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Função para cancelar uma reserva
  const handleCancel = async (id) => {
    const confirmCancel = window.confirm('Tem certeza que deseja cancelar esta reserva?');
    if (!confirmCancel) return;

    try {
      await axios.delete(`${API_URL}cancel/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Reserva cancelada com sucesso!');
      // Atualizar a lista de reservas
      setReservations(reservations.filter((reservation) => reservation.id !== id));
    } catch (err) {
      console.error('Erro ao cancelar reserva:', err);
      alert('Não foi possível cancelar a reserva. Tente novamente mais tarde.');
    }
  };

  // Buscar reservas ao carregar o componente
  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <p>Carregando reservas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Gerenciamento de Reservas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel</th>
            <th>Data de Check-in</th>
            <th>Data de Check-out</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.hotel_name}</td>
                <td>{new Date(reservation.check_in).toLocaleDateString()}</td>
                <td>{new Date(reservation.check_out).toLocaleDateString()}</td>
                <td>
                  R$ {Number(reservation.total_price).toFixed(2) || '0.00'}
                </td>
                <td>
                  <button onClick={() => handleCancel(reservation.id)}>Cancelar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhuma reserva encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
