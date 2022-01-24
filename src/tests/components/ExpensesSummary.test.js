import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary with 1 expense and no hidden expense without filter, correctly', () => {
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={1} 
                                expensesTotal={235}
                                hiddenExpenseCount={0}
                                noFilterInPlace={true}
                                />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with 1 expense and no hidden expense with filters, correctly', () => {
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={1} 
                                expensesTotal={235}
                                hiddenExpenseCount={0}
                                noFilterInPlace={false}
                                />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with 1 expense and 1 hidden expense with filters, correctly', () => {
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={1} 
                                expensesTotal={235}
                                hiddenExpenseCount={0}
                                noFilterInPlace={false}
                                />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with 1 expense and multiple hidden expense with filters, correctly', () => {
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={1} 
                                expensesTotal={235}
                                hiddenExpenseCount={2}
                                noFilterInPlace={false}
                                />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expenses and no hidden expense without filters, correctly', () => {
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={23} 
                                expensesTotal={23456789}
                                hiddenExpenseCount={0}
                                noFilterInPlace={true}
                            />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expenses and no hidden expense with filters, correctly', () => {
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={23} 
                                expensesTotal={23456789}
                                hiddenExpenseCount={0}
                                noFilterInPlace={false}
                            />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expenses and 1 hidden expense with filters, correctly', () => {
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={23} 
                                expensesTotal={23456789}
                                hiddenExpenseCount={1}
                                noFilterInPlace={false}
                            />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expenses and multiple hidden expenses with filters, correctly', () => {
    const wrapper = shallow(<ExpensesSummary 
                                expenseCount={23} 
                                expensesTotal={23456789}
                                hiddenExpenseCount={10}
                                noFilterInPlace={false}
                            />);
    expect(wrapper).toMatchSnapshot();
});