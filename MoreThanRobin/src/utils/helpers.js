// filepath: /MoreThanRobin/MoreThanRobin/src/utils/helpers.js
export const formatCatchDate = (date) => {
    return new Date(date).toLocaleString();
};

export const calculateLeaderboardRank = (catches) => {
    const sortedCatches = catches.sort((a, b) => b.size - a.size);
    return sortedCatches.map((catchItem, index) => ({
        ...catchItem,
        rank: index + 1,
    }));
};

export const filterCatchesByType = (catches, type) => {
    return catches.filter(catchItem => catchItem.type === type);
};