import moment from 'moment';
import expensesReducers from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    };
    const state = expensesReducers(expenses, action);
    expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducers(expenses, action);
    expect(state).toEqual(expenses);
});

// should add an expense 
test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '4',
            description: 'new expense 4',
            note: '',
            amount: 34500,
            createdAt: moment().valueOf()
        }
    };
    const state = expensesReducers(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
});

// should edit an expense
test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            note: 'amount is updated to 98700',
            amount: 98700
        }
    };
    const state = expensesReducers(expenses, action);
    expect(state).toEqual([expenses[0],{...expenses[1], ...action.updates}, expenses[2]]);
});
// should not edit an expense if id not found

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            note: 'amount is updated to 98700',
            amount: 98700
        }
    };
    const state = expensesReducers(expenses, action);
    expect(state).toEqual(expenses);
});