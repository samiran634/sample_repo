export const db = {
    connect: async (): Promise<boolean> => {
        console.log('Connecting to database...');
        await new Promise(resolve => setTimeout(resolve, 100)); // Mock delay
        console.log('Database connected.');
        return true;
    },
    disconnect: async () => {
        console.log('Database disconnected.');
    },
    query: async (sql: string, params: any[] = []) => {
        console.log(`Executing: ${sql}`, params);
        return { rowCount: 1, rows: [] };
    }
};
