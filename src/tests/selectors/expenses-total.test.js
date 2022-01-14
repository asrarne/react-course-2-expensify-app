import selectExpenseTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', ()=>{
    const action = selectExpenseTotal([]);
    expect(action).toBe(0);
});

test('should correctly add up a single expense', () => {
    const action = selectExpenseTotal([expenses[0]]);    
    expect(action).toBe(155);
});

test('should correctly add up multiple expenses', () => {
    const action = selectExpenseTotal(expenses);
    expect(action).toBe(124055);
});