import { addExpense, removeExpense, editExpense } from "../../actions/expenses";

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

    const expenseData = {
        description: 'sample description', 
        note: 'sample note', 
        amount: 1234, 
        createdAt: 1000
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
        ...expenseData,
        id: expect.any(String)
        }
    });
});

// test for add expense action with default values
test('should setup add expense action object with default values', () => {
    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

