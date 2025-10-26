/** biome-ignore lint/a11y/noLabelWithoutControl: labels are associated via htmlFor */
/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './loginPage.css'

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { signIn } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			await signIn(email, password);
			navigate('/game');
		} catch (err: any) {
			const errorMessage = err.message
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
	<div className='login-container'>
		<div className='login-card'>
			<div className='login-header'>
				<h2 className='login-title'>Welcome back</h2>
				<p className='login-subtitle'>Sign in to continue</p>
			</div>

			<form onSubmit={handleSubmit} className='login-form'>
				<div className='form-group'>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						id='email'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='form-input'
						placeholder='you@email.com'
						required
						disabled={loading}
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						id='password'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='form-input'
						placeholder='••••••••'
						required
						disabled={loading}
					/>
				</div>

				{error && (
					<div className='error-message'>
						<span className='error-icon'>⚠</span>
						{error}
					</div>
				)}

				<button
					type='submit'
					disabled={loading}
					className='login-button'>
					{loading ? (
						<span className='button-loading'>
							<span className='spinner' />
							Loading...
						</span>
					) : (
						'Sign In'
					)}
				</button>
			</form>

			<div className='login-footer'>
				<p className='footer-text'>
					Don't have an account?{' '}
					<a href='/signup' className='footer-link'>
						Sign up here
					</a>
				</p>
			</div>
		</div>
	</div>
);
};

export default Login;