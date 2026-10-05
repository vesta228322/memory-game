
const STORAGE_KEY = 'game-results';

export const getResults = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(data);
    return parsed ?? [];
};

export const saveResult = (moves) => {
    const results = getResults();
    results.push({ moves, date: new Date().toISOString()});
    results.sort((a, b) => a.moves - b.moves || new Date(a.date) - new Date(b.date));
    const top = results.slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
};

