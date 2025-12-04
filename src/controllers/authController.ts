import { registerUser, loginUser } from '../services/authService';
import { Request, Response } from 'express';

export const handleRegister = (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        
        const user = registerUser(email, password);
        res.status(201).json({ success: true, data: user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const handleLogin = (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = loginUser(email, password);
        
        if (!result) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const handleLogout = (req: Request, res: Response) => {
    // In a real app, we would invalidate the token here
    console.log('User logged out');
    res.json({ success: true, message: 'Logged out successfully' });
};

export const handleForgotPassword = (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    
    console.log(`Password reset requested for ${email}`);
    res.json({ success: true, message: 'If account exists, reset link sent' });
};
