import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUserProfile = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = userService.findUserById(userId);
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, data: user });
};

export const updateUserProfile = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const updates = req.body;
    
    const updatedUser = userService.updateUser(userId, updates);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    
    res.json({ success: true, data: updatedUser });
};

export const listUsers = (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = userService.getAllUsers(page, limit);
    res.json({ success: true, ...result });
};

export const deleteUserAccount = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (userService.deleteUser(userId)) {
        res.json({ success: true, message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
};
