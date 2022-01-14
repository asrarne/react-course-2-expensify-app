import { createStore, combineReducers } from "redux";
import uuid from 'uuid';

//state // amount is in cents i.e. 1 USD * 100 = 100 cents
// const demoState = { expenses: [{
//     id: 'uniqueid',
//     description: 'This is the sample description',
//     note: 'This is the sample note',
//     amount: 54500,
//     createdAt: 0
// }],
// filters: {
//     text: 'rent',
//     sortBy: 'amount', // date or amount
//     startDate: undefined,
//     endDate: undefined
// }
// };

//action generators
//ADD_EXPENSE
const addExpense = (
        { description='', 
          note='', 
          amount=0, 
          createdAt=0
        } = {}
    ) => ({
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note, 
            amount,
            createdAt   
        }
});

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
const editExpense = (id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_TEXT_FILTER
const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SORT_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//timestamp = miliseconds
// January 1st 1970 (unix epoch)
// valid values 10, -203, 10400 

//get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense)=> {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
// filter reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            // console.log('set text filter in filterReducer'); 
            return {...state,  text: action.text};
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'}
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'}
        case 'SET_START_DATE':
            return {...state,  startDate: action.startDate};
        case 'SET_END_DATE':
            return {...state,  endDate: action.endDate};
        default:
            return state;
    }
};

const expenseReducerDefaultState = [];
//expense reducer
const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                        ...state, 
                        action.expense
                    ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);    
        case 'EDIT_EXPENSE':
            return state.map((expense)=> {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });                   
        default:
            return state;    
    }
}

//store
const store = createStore( 
    combineReducers({
        expenses: expenseReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    console.log(state.filters);
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);

});

// unsubscribe();

const expenseOne = store.dispatch(addExpense({ 
    description: 'rent',
    amount: 1000,
    createdAt: 1000
}));

const expenseTwo = store.dispatch(addExpense({ 
    description: 'coffee',
    amount: 300,
    createdAt: 2000
}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));

// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
// store.dispatch(sortByAmount());

