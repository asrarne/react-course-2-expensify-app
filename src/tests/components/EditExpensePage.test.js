import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn()};
    wrapper = shallow(<EditExpensePage expense={expenses[0]}   
                                       history={history}
                                       startEditExpense={startEditExpense} 
                                       startRemoveExpense={startRemoveExpense} 
                                    />);
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();                                         
});

test('should handle edit expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('should handle remove expense', () => {
    wrapper.find('button').prop('onClick')();
    expect(wrapper.state('removeClicked')).toBe(true);
});