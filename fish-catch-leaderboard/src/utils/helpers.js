export const formatCatchDate = (date) => {
    return new Date(date).toLocaleString();
};

export const validateCatchInput = (fishType, size) => {
    if (!fishType || !size) {
        return false;
    }
    return true;
};

export const sortCatchesBySize = (catches) => {
    return catches.sort((a, b) => b.size - a.size);
};

export const groupCatchesByType = (catches) => {
    return catches.reduce((acc, catchItem) => {
        if (!acc[catchItem.type]) {
            acc[catchItem.type] = [];
        }
        acc[catchItem.type].push(catchItem);
        return acc;
    }, {});
};