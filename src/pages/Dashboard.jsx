import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Registrando os componentes necessários para o gráfico
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const Dashboard = () => {
  // Dados fictícios para o gráfico
  const chartData = {
    labels: ['Pendentes', 'Pagos', 'Cancelados'],
    datasets: [
      {
        data: [15, 50, 35],
        backgroundColor: ['#f39c12', '#27ae60', '#e74c3c'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ paddingInline: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Dashboard</h1>
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#7f8c8d' }}>Bem-vindo ao painel administrativo.</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
        <div style={boxStyle}>
          <h3>Total de Hotéis Cadastrados</h3>
          <p>120</p>
        </div>
        <div style={boxStyle}>
          <h3>Total de Reservas Ativas</h3>
          <p>45</p>
        </div>
        <div style={boxStyle}>
          <h3>Total de Reservas em Espera</h3>
          <p>30</p>
        </div>
      </div>

      <h3 style={{ textAlign: 'center', color: '#34495e' }}>Estado das Reservas</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '30%' }}>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
};

const boxStyle = {
  backgroundColor: '#ecf0f1',
  padding: '20px',
  borderRadius: '8px',
  width: '25%',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

export default Dashboard;
