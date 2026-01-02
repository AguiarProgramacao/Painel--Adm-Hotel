import { useState } from 'react';
import HotelList from '../components/HotesList';
import HotelForm from '../components/HotelForm';

const Hotels = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div>
      <h1>Gerenciamento de Hotéis</h1>
      <button style={{ padding: 10, border: "none", borderRadius: 8, backgroundColor: "#1ABC5C", color: "#FFF", fontSize: 14, cursor: "pointer" }} onClick={toggleForm}>
        {showForm ? 'Voltar à Lista' : 'Adicionar Novo Hotel'}
      </button>
      {showForm ? <HotelForm onSave={() => setShowForm(false)} /> : <HotelList />}
    </div>
  );
};

export default Hotels;
