export const users = [];
export const challenges = [];
export const generateMockId = () => [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
