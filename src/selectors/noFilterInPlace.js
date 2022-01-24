

export default (filters) => {
    const clearFilters = {
        text: '',
        sortBy: 'date',
        startDate: null,
        endDate: null
    };
    return JSON.stringify(filters) === JSON.stringify(clearFilters);
};