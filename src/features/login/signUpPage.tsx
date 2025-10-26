/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import './loginPage.css';
import { type FormEvent, useState } from 'react';
import { useAuth } from '../../context/authContext';
import type { SignUpData } from '../../shared/types/index.type';

export default function SignUp() {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { signUp } = useAuth();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		const userData: SignUpData = {
			username: userName,
			email,
			password,
		};

		try {
			await signUp(userData);
		} catch (err: any) {
			const errorMessage = err.message;
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='login-container'>
			<div className='login-card'>
				<div className='login-header'>
					<h2 className='login-title'>Create your account</h2>
					<p className='login-subtitle'>Sign up to get started</p>
				</div>

				<form onSubmit={handleSubmit} className='login-form'>
					<div className='form-group'>
						<label htmlFor='username' className='form-label'>
							Username
						</label>
						<input
							id='username'
							type='text'
							value={userName}
							onChange={e => setUserName(e.target.value)}
							className='form-input'
							placeholder='JohnDoe'
							required
							disabled={loading}
						/>
					</div>

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
							placeholder='john@example.com'
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

					<button type='submit' disabled={loading} className='login-button'>
						{loading ? (
							<span className='button-loading'>
								<span className='spinner' />
								Creating account...
							</span>
						) : (
							'Sign Up'
						)}
					</button>
				</form>

				<div className='login-footer'>
					<p className='footer-text'>
						Already have an account?{' '}
						<a href='/login' className='footer-link'>
							Sign in here
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}