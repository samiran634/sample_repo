import express from 'express';
import { handleRegister, handleLogin, handleLogout, handleForgotPassword } from './controllers/authController';
import * as userController from './controllers/userController';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Auth Routes
app.post('/register', handleRegister);
app.post('/login', handleLogin);
app.post('/logout', handleLogout);
app.post('/forgot-password', handleForgotPassword);

// User Routes
app.get('/users', userController.listUsers);
app.get('/users/:id', userController.getUserProfile);
app.put('/users/:id', userController.updateUserProfile);
app.delete('/users/:id', userController.deleteUserAccount);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'UP', timestamp: new Date() });
});

// Error Handler
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
