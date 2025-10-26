import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <div>Loading...</div>;
	return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

export default PrivateRoute;
