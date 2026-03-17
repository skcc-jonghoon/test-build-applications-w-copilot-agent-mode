import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <main className="app-shell py-4">
      <div className="container">
        <header className="app-title-wrap p-4 mb-4 shadow-sm">
          <div className="d-flex align-items-start gap-3">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit logo"
              className="app-logo"
            />
            <div>
              <h1 className="display-6 fw-bold mb-2 app-heading">OctoFit Tracker</h1>
              <p className="app-subtitle mb-2">Backend REST API data viewer</p>
              <a className="app-link" href="https://www.djangoproject.com/" target="_blank" rel="noreferrer">
                Built with Django REST API + React
              </a>
            </div>
          </div>
        </header>

        <nav className="nav nav-pills gap-2 mb-4" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <section className="pb-4">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </section>
      </div>
    </main>
  );
}

export default App;
