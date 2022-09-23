let debounceTimer: number;

export const debounce = (callback: () => void, time = 300) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
};
