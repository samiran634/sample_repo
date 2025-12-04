import { validateEmail, validatePassword } from '../utils/validators';
import { sendWelcomeEmail } from '../utils/email';
import { findUserByEmail, createUser, updateUser } from './userService';

export const registerUser = (email: string, pass: string) => {
    if (!validateEmail(email)) throw new Error('Invalid email format');
    
    if (findUserByEmail(email)) {
        throw new Error('User already exists');
    }

    const user = createUser({
        email,
        username: email.split('@')[0],
        role: 'user',
        isActive: true
    });
    
    return user;
};

export const loginUser = (email: string, pass: string) => {
    const user = findUserByEmail(email);
    if (!user || !user.isActive) return null;
    
    // Mock password verification (accepts any password > 3 chars)
    if (pass.length < 3) return null;

    updateUser(user.id, { isActive: true });
    
    return { 
        token: `jwt_token_${user.id}_${Date.now()}`,
        user: { 
            id: user.id, 
            email: user.email,
            role: user.role 
        }
    };
};
