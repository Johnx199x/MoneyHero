import './App.css';
import './Styles/global.css';
import './Styles/variables.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import PlayerDashboard from './features/game/Player/gamePage';
import { HomePage } from './features/landing/HomePage';

function App() {
	return (
		<ErrorBoundary>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route
						path='/game'
						element={
							<ErrorBoundary>
								<PlayerDashboard />
							</ErrorBoundary>
						}
					/>
				</Routes>
				<Footer />
			</Router>
			<Analytics />
			<SpeedInsights />
		</ErrorBoundary>
			
	);
}

export default App;
