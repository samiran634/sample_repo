/**
 * Validation Utilities
 */

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    // At least 8 chars, 1 number, 1 uppercase
    const hasNumber = /\d/;
    const hasUpper = /[A-Z]/;
    return password.length >= 8 && hasNumber.test(password) && hasUpper.test(password);
};

export const validateUsername = (username: string): boolean => {
    // Alphanumeric, 3-20 chars
    return /^[a-zA-Z0-9]{3,20}$/.test(username);
};

export const sanitizeInput = (input: string): string => {
    if (!input) return '';
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};
