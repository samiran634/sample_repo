export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
    isActive: boolean;
}

const userStorage: User[] = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', isActive: true },
    { id: 2, username: 'user', email: 'user@example.com', role: 'user', isActive: true }
];

export const findUserById = (id: number): User | undefined => {
    return userStorage.find(u => u.id === id);
};

export const findUserByEmail = (email: string): User | undefined => {
    return userStorage.find(u => u.email === email);
};

export const createUser = (user: Omit<User, 'id'>): User => {
    const newUser = { ...user, id: userStorage.length + 1 };
    userStorage.push(newUser);
    return newUser;
};

export const updateUser = (id: number, updates: Partial<User>): User | null => {
    const index = userStorage.findIndex(u => u.id === id);
    if (index === -1) return null;
    userStorage[index] = { ...userStorage[index], ...updates };
    return userStorage[index];
};

export const deleteUser = (id: number): boolean => {
    const index = userStorage.findIndex(u => u.id === id);
    if (index === -1) return false;
    userStorage.splice(index, 1);
    return true;
};
