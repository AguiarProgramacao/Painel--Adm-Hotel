import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import './Dashboard.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const Dashboard = () => {
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
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">Bem-vindo ao painel administrativo.</p>
      
      <div className="dashboard-grid">
        <div className="dashboard-box">
          <h3>Total de Hotéis Cadastrados</h3>
          <p className="dashboard-value">120</p>
        </div>
        <div className="dashboard-box">
          <h3>Total de Reservas Ativas</h3>
          <p className="dashboard-value">45</p>
        </div>
        <div className="dashboard-box">
          <h3>Total de Reservas em Espera</h3>
          <p className="dashboard-value">30</p>
        </div>
      </div>

      <h3 className="dashboard-chart-title">Estado das Reservas</h3>
      <div className="dashboard-chart-container">
        <div className="dashboard-chart-box">
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
