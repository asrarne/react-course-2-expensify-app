import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';
import selectExpenseTotal from '../../selectors/expenses-total';

test('should render ExpensesSummary with no expenses correctly', () => {
    const expenseCount = [].length;
    const expensesTotal = selectExpenseTotal([]);
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={expenseCount} 
                                expensesTotal={expensesTotal}
                                />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with expenses correctly', () => {
    const expenseCount = expenses.length;
    const expensesTotal = selectExpenseTotal(expenses);
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={expenseCount} 
                                expensesTotal={expensesTotal}
                            />);
    expect(wrapper).toMatchSnapshot();
});