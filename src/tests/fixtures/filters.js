import moment from 'moment';

const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const altFilters = {
    text: 'bill',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3,'days')
};

const altDateFilters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: moment(0).add(3,'days')
};

const noFilters = {
    text: '',
    sortBy: 'date',
    startDate: null,
    endDate: null
};

export { filters, altFilters, noFilters, altDateFilters };