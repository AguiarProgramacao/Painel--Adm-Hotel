import React, { useState, useEffect } from 'react';
import api from '../services/api';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Erro ao buscar hotéis:', error);
      }
    };

    fetchHotels();
  }, []);

  const deleteHotel = async (id) => {
    try {
      await api.delete(`/hotels/delete/${id}`);
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.error('Erro ao excluir hotel:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Hotéis</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            {hotel.name} - {hotel.location}
            <button onClick={() => deleteHotel(hotel.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
