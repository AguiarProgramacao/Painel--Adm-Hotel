import { useState } from 'react';
import api from '../services/api';
import './HotelForm.css';

const HotelForm = ({ hotel = {}, onSave }) => {
  const [formData, setFormData] = useState({
    name: hotel.name || '',
    description: hotel.description || '',
    location: hotel.location || '',
    price_per_night: hotel.price_per_night || '',
    available_rooms: hotel.available_rooms || '',
    image: null,
    preview: hotel.image || '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
          preview: URL.createObjectURL(file),
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('price_per_night', formData.price_per_night);
      formDataToSend.append('available_rooms', formData.available_rooms);

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (hotel.id) {
        await api.put(`/hotels/update/${hotel.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/hotels/add', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      onSave();
    } catch (error) {
      console.error('Erro ao salvar hotel:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{hotel.id ? 'Editar Hotel' : 'Adicionar Novo Hotel'}</h2>
      <form onSubmit={handleSubmit} className="hotel-form">
        <label>Nome do Hotel</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Descrição</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Localização</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>Preço por Noite</label>
        <input name="price_per_night" type="number" value={formData.price_per_night} onChange={handleChange} required />

        <label>Quartos Disponíveis</label>
        <input name="available_rooms" type="number" value={formData.available_rooms} onChange={handleChange} required />

        <label>Imagem do Hotel</label>
        <input type="file" name="image" onChange={handleChange} accept="image/*" />

        {formData.preview && (
          <div className="image-preview">
            <img src={formData.preview} alt="Pré-visualização" />
          </div>
        )}

        <button type="submit" className="save-button">Salvar</button>
      </form>
    </div>
  );
};

export default HotelForm;
