// Simplified helper functions
export const formatDate = (date) => new Date(date).toLocaleDateString();

export const sortBySize = (catches) => catches.sort((a, b) => b.size - a.size);