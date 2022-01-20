// import uuid from 'uuid';
// import moment from 'moment';
import dbExpenseRef from '../firebase/firebase';
import { set, push, onValue, get } from 'firebase/database';
import expenses from '../tests/fixtures/expenses';

//action generators
//ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
                description = '', 
                note = '', 
                amount = 0, 
                createdAt = 0
                } = expenseData;
        const expense = { description, note, amount, createdAt };

        const newExpenseRef = push(dbExpenseRef);

        return set(newExpenseRef, expense)
        .then(()=>{
            dispatch(addExpense({
                id: newExpenseRef.key,
                ...expense
            }));
        }).catch((e) => {
            console.log('startAddExpense failed with error: ', e);
        });
    };
}; 

//REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
export const editExpense = (id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return get(dbExpenseRef).then((snapshot) => {
            if (snapshot.exists()) {
                let expenses = [];
                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setExpenses(expenses));
            } else {
                console.log("No data available");
            }
        }).catch((e)=>{
                console.log('Error in startSetExpenses: ',e);
        });
    };
};