import moment from "moment";

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

export const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return "Never";
    return moment.unix(timestamp).format("ddd, D MMM YYYY, H:mm");
};
