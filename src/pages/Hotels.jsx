import React, { useState } from 'react';
import HotelList from '../components/HotesList';
import HotelForm from '../components/HotelForm';

const Hotels = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div>
      <h1>Gerenciamento de Hotéis</h1>
      <button onClick={toggleForm}>
        {showForm ? 'Voltar à Lista' : 'Adicionar Novo Hotel'}
      </button>
      {showForm ? <HotelForm onSave={() => setShowForm(false)} /> : <HotelList />}
    </div>
  );
};

export default Hotels;
