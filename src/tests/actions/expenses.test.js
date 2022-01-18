import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, removeExpense, editExpense, startAddExpense } from "../../actions/expenses";
import expenses from '../fixtures/expenses';
import {db} from '../../firebase/firebase';
import {ref, onValue, get, child} from 'firebase/database';

const createMockStore = configureMockStore([thunk]);

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
        // done();
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
    done();
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
        // done();
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
    done();
});



// test for add expense action with default values
// test('should setup add expense action object with default values', () => {
//     const expenseData = {
//         description: '',
//         note: '',
//         amount: 0,
//         createdAt: 0
//     };

//     const action = addExpense();

//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData,
//             id: expect.any(String)
//         }
//     })
// });

