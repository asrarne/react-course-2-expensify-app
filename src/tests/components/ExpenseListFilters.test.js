import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters }  from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';


let setStartDate, setEndDate, sortByDate, sortByAmount, setTextFilter, wrapper;

beforeEach(() => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setTextFilter = jest.fn();
    wrapper = shallow(<ExpenseListFilters 
                            filters={filters}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            sortByDate={sortByDate}
                            sortByAmount={sortByAmount}
                            setTextFilter={setTextFilter} />);

});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

// should handle text change
test('should handle text change', () => {
    const value = altFilters.text;
    wrapper.find('input').simulate('change', {
        target: {value}
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

// should sort by date
test('should sort by date', () => {
    wrapper.setProps({
        filters: altFilters
    });
    const value = 'date';
    wrapper.find('select').simulate('change', {
        target: {value}
    });
    expect(sortByDate).toHaveBeenLastCalledWith();
});

// should sort by amount
test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: {value}
    });
    expect(sortByAmount).toHaveBeenLastCalledWith();
});

// should handle date changes
test('should handle date changes', () => {
    const startDate = altFilters.startDate;
    const endDate = altFilters.endDate;
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// should handle date focus change
test('should handle date focus change', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
