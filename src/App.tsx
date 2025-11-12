import './App.css';
import './Styles/global.css';
import './Styles/variables.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/layout/Footer';
import { LoadingScreen } from './components/layout/LoadingScreen';
import NavBar from './components/layout/NavBar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/authContext';
import AboutPage from './features/about/aboutPage';
import PlayerDashboard from './features/game/Player/gamePage';
import { HomePage } from './features/landing/HomePage';
import Login from './features/login/loginPage';
import SignUp from './features/login/signUpPage';
import { useHydration } from './hooks/useHydration';

function App() {
	const isMounted = useHydration();

	if (!isMounted) {
		return <LoadingScreen />;
	}

	return (
		<ErrorBoundary>
			<AuthProvider>
				<Router>
					<NavBar />
					<Routes>
						{/* Rutas públicas */}
						<Route path='/' element={<HomePage />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signUp' element={<SignUp />} />
						<Route path='/about' element={<AboutPage />} />
						{/* Rutas protegidas */}
						<Route
							path='/game'
							element={
								<PrivateRoute>
									<ErrorBoundary>
										<PlayerDashboard />
									</ErrorBoundary>
								</PrivateRoute>
							}
						/>
					</Routes>
					<Footer />
				</Router>
			</AuthProvider>
			<Analytics />
			<SpeedInsights />
		</ErrorBoundary>
	);
}

export default App;
