import { useState, useEffect } from 'react';
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
    <div style={styles.container}>
      <h2 style={styles.title}>Lista de Hotéis</h2>
      <div style={styles.hotelList}>
        {hotels.map((hotel) => (
          <div key={hotel.id} style={styles.hotelCard}>
            <img src={hotel.image || 'https://via.placeholder.com/100'} alt={hotel.name} style={styles.hotelImage} />
            <div style={styles.hotelInfo}>
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
            </div>
            <button style={styles.deleteButton} onClick={() => deleteHotel(hotel.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  hotelList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  hotelCard: {
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    gap: '15px',
  },
  hotelImage: {
    width: '80px',
    height: '80px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  hotelInfo: {
    flex: 1,
  },
  deleteButton: {
    background: '#E74C3C',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default HotelList;
