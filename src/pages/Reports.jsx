import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Payments = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Buscar reservas pendentes de pagamento
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/bookings'); // Certifique-se de que essa rota retorna as reservas
      setBookings(response.data);
    } catch (err) {
      setError('Erro ao buscar reservas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Iniciar pagamento com Stripe
  const handlePayment = async (booking_id) => {
    try {
      const response = await api.post('/payments/checkout', { booking_id });
      if (response.data.url) {
        window.location.href = response.data.url; // Redireciona para o Stripe
      }
    } catch (err) {
      console.error('Erro ao iniciar pagamento:', err);
      alert('Erro ao iniciar o pagamento. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Pagamentos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Total</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.hotel_name}</td>
                <td>{new Date(booking.check_in).toLocaleDateString()}</td>
                <td>{new Date(booking.check_out).toLocaleDateString()}</td>
                <td>R$ {Number(booking.total_price).toFixed(2)}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === 'pendente' && (
                    <button onClick={() => handlePayment(booking.id)}>Pagar</button>
                  )}
                  {booking.status === 'pago' && <span>Pago</span>}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Nenhuma reserva encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
