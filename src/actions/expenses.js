// import uuid from 'uuid';
// import moment from 'moment';
import { db } from '../firebase/firebase';
import { set, push, onValue, get, ref, remove, update } from 'firebase/database';
// import expenses from '../tests/fixtures/expenses';

//action generators
//ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const dbExpenseRef = ref(db, `users/${uid}/expenses`);
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const dbExpenseRef = ref(db, `users/${uid}/expenses`);
        return get(dbExpenseRef).then((snapshot) => {
            if (snapshot.exists()) {
                let expenses = [];
                snapshot.forEach((childSnapshot) => {
                    // console.log('in startSetExpenses: ', childSnapshot.val());
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setExpenses(expenses));
            } else {
                console.log("No data available");
            }
        }).catch((error)=>{
                console.log('Error in startSetExpenses: ', error);
        });
    };
};

export const startRemoveExpense = ({id} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const dbExpenseRefwithId = ref(db, `users/${uid}/expenses/${id}`);
        return remove(dbExpenseRefwithId).then(()=>{
            dispatch(removeExpense({id}));
        }).catch((error)=>{
            console.log('Error in startRemoveExpense: ', error);
        });
    };
};

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const dbExpenseRefwithId = ref(db, `users/${uid}/expenses/${id}`);
        return update ((dbExpenseRefwithId),updates).then(()=>{
            dispatch(editExpense(id, updates));
        }).catch((error)=>{
            console.log('error in startEditExpense:', error);
        });
    };
};