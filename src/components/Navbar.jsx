import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Painel admin</h2>
      <ul style={styles.menu}>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              style={location.pathname === item.path ? { ...styles.link, ...styles.active } : styles.link} 
              to={item.path}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const menuItems = [
  { path: "/", label: "Dashboard" },
  { path: "/hotels", label: "Hotéis" },
  { path: "/reservations", label: "Reservas" },
  { path: "/reports", label: "Relatórios" },
];

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px',
    height: '100vh',
    backgroundColor: '#2C3E50',
    padding: '20px',
    color: 'white',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: "#FFF"
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  active: {
    backgroundColor: '#1ABC9C',
  },
};

export default Sidebar;
