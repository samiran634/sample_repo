export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
    isActive: boolean;
}

// In-memory storage
const users: User[] = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', isActive: true },
    { id: 2, username: 'user', email: 'user@example.com', role: 'user', isActive: true }
];

export const findUserById = (id: number): User | undefined => {
    return users.find(u => u.id === id);
};

export const findUserByEmail = (email: string): User | undefined => {
    return users.find(u => u.email === email);
};

export const createUser = (userData: Omit<User, 'id'>): User => {
    const newUser = { ...userData, id: users.length + 1 };
    users.push(newUser);
    return newUser;
};

export const updateUser = (id: number, updates: Partial<User>): User | null => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updates };
    return users[index];
};

export const deleteUser = (id: number): boolean => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
};

export const getAllUsers = (page: number, limit: number) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
        users: users.slice(start, end),
        total: users.length
    };
};
