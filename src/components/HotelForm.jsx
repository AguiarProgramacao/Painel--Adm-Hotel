import React, { useState } from 'react';
import api from '../services/api';

const HotelForm = ({ hotel = {}, onSave }) => {
  const [formData, setFormData] = useState({
    name: hotel.name || '',
    description: hotel.description || '',
    location: hotel.location || '',
    price_per_night: hotel.price_per_night || '',
    available_rooms: hotel.available_rooms || '',
    image: null, // Novo estado para armazenar a imagem
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] }); // Armazena o arquivo de imagem selecionado
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
        formDataToSend.append('image', formData.image); // Adiciona a imagem ao FormData
      }

      if (hotel.id) {
        // Atualiza o hotel existente
        await api.put(`/hotels/update/${hotel.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data', // Informar que estamos enviando dados multipart
          },
        });
      } else {
        // Adiciona um novo hotel
        await api.post('/hotels/add', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data', // Informar que estamos enviando dados multipart
          },
        });
      }

      onSave(); // Atualiza a lista de hotéis ou faz outra ação após salvar
    } catch (error) {
      console.error('Erro ao salvar hotel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nome do Hotel"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descrição"
        required
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Localização"
        required
      />
      <input
        name="price_per_night"
        value={formData.price_per_night}
        onChange={handleChange}
        placeholder="Preço por noite"
        type="number"
        required
      />
      <input
        name="available_rooms"
        value={formData.available_rooms}
        onChange={handleChange}
        placeholder="Quartos disponíveis"
        type="number"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*" // Limita a seleção para arquivos de imagem
      />
      {formData.image && (
        <div>
          <p>Imagem selecionada: {formData.image.name}</p>
        </div>
      )}
      <button type="submit">Salvar</button>
    </form>
  );
};

export default HotelForm;
