import React, { useState, useEffect, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import './RecoverPassword.css';

const RecoverPassword: React.FC = () => {
    const location = useLocation();
    const [code, setCode] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const codeParam = params.get('code');
        if (codeParam) {
            setCode(codeParam);
        }
    }, [location]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/recover', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword: password, code }),
            });

            if (response.ok) {
                setSuccess(true);
                setError('');
            } else {
                const responseData = await response.json();
                setError(responseData.message || 'Failed to update the password');
            }
        } catch (err) {
            setError('An error occurred while updating the password');
        }
    };

    return (
        <div className="recover-password-container">
            <h1>Recover Password</h1>
            {code ? (
                success ? (
                    <p className="recover-password-success">Password was successfully updated!</p>
                ) : (
                    <form onSubmit={handleSubmit} className="recover-password-form">
                        <div>
                            <label htmlFor="password">New Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p>{error}</p>}
                        <button type="submit">Submit</button>
                    </form>
                )
            ) : (
                <p>Invalid or missing recovery code.</p>
            )}
        </div>
    );
};

export default RecoverPassword;