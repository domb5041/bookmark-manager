let debounceTimer: number;

export const debounce = (callback: () => void, time = 300) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
};

export const isValidHttpUrl = (string: string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
};

export const formatUrl = (url: string) => {
    const partsToRemove = /https?:\/\/|www./g;
    const trimmedStart = url.replace(partsToRemove, "");
    const trimmedEnd = trimmedStart.split("/")[0];
    return trimmedEnd;
};
