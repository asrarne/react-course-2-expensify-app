import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, editExpense, removeExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

// console.log(store.getState());
// console.log('moment: ', moment().valueOf());

// store.subscribe(() => {
//     const state = store.getState();
//     const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//     console.log(visibleExpenses);
//     console.log(state.filters);
//     console.log(state.expenses);

// });


// const expenseOne = store.dispatch(addExpense({ 
//     description: 'Water bill',
//     amount: 4500,
//     createdAt: moment().subtract(1, 'months').valueOf()
// }));

// const expenseTwo = store.dispatch(addExpense({ 
//     description: 'Gas bill',
//     amount: 5678,
//     createdAt: moment().valueOf()
// }));

// const expenseThree = store.dispatch(addExpense({ 
//     description: 'Rent',
//     amount: 109500,
//     createdAt: moment().add(1, 'months').valueOf()
// }));

// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

