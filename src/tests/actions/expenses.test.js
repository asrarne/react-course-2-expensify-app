import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, removeExpense, editExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from "../../actions/expenses";
import expenses from '../fixtures/expenses';
import dbExpenseRef, { db }  from '../../firebase/firebase';
import {ref, onValue, get, set} from 'firebase/database';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, amount, note, createdAt}) => {
        expenseData[id] = { description, amount, note, createdAt };
    });
    set(dbExpenseRef, expenseData).then(() => done());
}); 

//test for remove expense action
test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});


// test for edit expense action
test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { description:'new description', 
                                           note: 'new note', 
                                           amount: 234500
                                        }
                                );
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            description: 'new description',
            note: 'new note',
            amount: 234500
        }
    });
});

//test for add expense action with provided values
test('should setup add expense action object with provided values', () => {

    const expenseData = expenses[2];
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenseData
    });
});

test('should add exepense to database and store', (done)=>{
    const store = createMockStore({});
    const expenseData = {
                            description: 'This is the description',
                            amount: 1500,
                            note: 'this is the note',
                            createdAt: 1000
                        };                                     
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
            id: expect.any(String),
            ...expenseData
            }
        });
        const dbRef = ref(db, `expenses/${action[0].expense.id}`);
        return get(dbRef);
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with default value to database and store', (done)=>{
    const store = createMockStore({});
    const expenseData = {
                            description: '',
                            amount: 0,
                            note: '',
                            createdAt: 0
                        };                                     
    store.dispatch(startAddExpense({})).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
            id: expect.any(String),
            ...expenseData
            }
        });
        const dbRef = ref(db, `expenses/${action[0].expense.id}`);
        return get(dbRef);
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done)=>{
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(()=>{
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove the expense from firebase if it exists in it', (done) => {
    const store = createMockStore({});
    const id = 1;
    store.dispatch(startRemoveExpense({id})).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        const dbRef = ref(db, `expenses/${id}`);
        return get(dbRef);
    }).then((snapshot) => {
        expect(snapshot.val()).toBeNull();
        done();
    });
});

test('should edit the expense and save in firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[1].id;
    const { description, note, amount, createdAt } = expenses[1];
    const updates = {
                        description: 'new description',
                        note: 'new note',
                        amount: 234500
                    };
    store.dispatch(startEditExpense(id, updates)).then(()=>{
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        const dbRef = ref(db, `expenses/${id}`);
        return get(dbRef);
    }).then((snapshot)=>{
            expect(snapshot.val()).toEqual({ description, note, amount, createdAt, ...updates });
            done();
    });
});
