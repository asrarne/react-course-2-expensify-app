import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';


//filter by text
test('should filetr by text value', ()=>{
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const action = selectExpenses(expenses, filters);
    expect(action).toEqual([ expenses[2], expenses[1] ]);
});

test('should filter by start date value', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0).subtract(3, 'days'),
        endDate: undefined
    };
    const action = selectExpenses(expenses, filters);
    expect(action).toEqual([ expenses[2], expenses[0]]);
});

// should filter by end date value
test('should filter by end date value',()=>{
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(3, 'days')
    };
    const action = selectExpenses(expenses, filters);
    expect(action).toEqual([ expenses[0], expenses[1]]);
});

// should sort by date 
test('should filter by end date value',()=>{
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const action = selectExpenses(expenses, filters);
    expect(action).toEqual([ expenses[2], expenses[0], expenses[1]]);
});

// should sort by amount
test('should filter by end date value',()=>{
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const action = selectExpenses(expenses, filters);
    expect(action).toEqual([ expenses[1], expenses[2], expenses[0]]);
});