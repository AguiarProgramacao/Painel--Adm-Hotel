import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Reservation.css';

const API_URL = 'http://192.168.0.108:5000/api/bookings/';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReservations(response.data);
    } catch (err) {
      console.error('Erro ao buscar reservas:', err);
      setError('Não foi possível carregar as reservas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Tem certeza que deseja cancelar esta reserva?')) return;

    try {
      await axios.delete(`${API_URL}cancel/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Reserva cancelada com sucesso!');
      setReservations((prevReservations) => prevReservations.filter((res) => res.id !== id));
    } catch (err) {
      console.error('Erro ao cancelar reserva:', err);
      alert('Não foi possível cancelar a reserva. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return (
    <div className="container">
      <h1 className="title">Gerenciamento de Reservas</h1>

      {loading && <p className="message">Carregando reservas...</p>}
      {error && <p className="error">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel</th>
            <th>Check-in</th>
            <th>Check-out</th>
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
                <td>{formatDate(reservation.check_in)}</td>
                <td>{formatDate(reservation.check_out)}</td>
                <td>R$ {Number(reservation.total_price).toFixed(2) || '0.00'}</td>
                <td>
                  <CancelButton onClick={() => handleCancel(reservation.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">Nenhuma reserva encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateString));
};

const CancelButton = ({ onClick }) => (
  <button className="cancel-button" onClick={onClick}>Cancelar</button>
);

export default Reservations;
