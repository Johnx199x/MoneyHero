import './App.css';
import './Styles/global.css';
import './Styles/variables.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import PlayerDashboard from './features/game/Player/gamePage';
import { HomePage } from './features/landing/HomePage';

function App() {
	return (
			
			<Router>
				<NavBar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/dashboard' element={<PlayerDashboard />} />
				</Routes>
				<Footer />
			</Router>

			
	);
}

export default App;
