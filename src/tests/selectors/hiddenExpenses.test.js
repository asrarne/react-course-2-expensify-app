import selectHiddenExpenses from '../../selectors/hiddenExpenses';
import selectVisibleExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';
import { altDateFilters, noFilters } from '../fixtures/filters';

test('should return 0 hidden expenses if expenses are same as visible expenses', ()=>{
    const visibleExpenses = selectVisibleExpenses(expenses, noFilters);
    const hiddenExpenses = selectHiddenExpenses(expenses, visibleExpenses);
    expect(hiddenExpenses.length).toBe(0);
});

test('should correctly return hidden expenses if visible expenses are subset of expenses', () => {
    const visibleExpenses = selectVisibleExpenses(expenses, altDateFilters);
    const hiddenExpenses = selectHiddenExpenses(expenses, visibleExpenses);
    expect(hiddenExpenses.length).toBe(2);
});