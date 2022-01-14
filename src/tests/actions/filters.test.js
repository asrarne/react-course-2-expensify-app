import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../../actions/filters";
import moment from 'moment';

// test for set text filter action object with provided value
test('should setup text filter action object',()=>{
    const text = 'rent';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

// test for set text filter action object with default value
test('should setup text filter action object',()=>{
    const text = '';
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});


// test for sort by date filter action object
test('should setup sort by amount filter action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

// test for sort by amount filter action object
test('should setup sort by date filter action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

// test for set start date filter action object
test('should setup start date filter action',() => {
    const startDate = moment(0);
    const action = setStartDate(startDate);
    expect(action).toEqual({
        type: 'SET_START_DATE', 
        startDate: moment(0)
    });
});
// test for set end date filter action object
test('should setup end date filter action',() => {
    const endDate = moment(0);
    const action = setEndDate(endDate);
    expect(action).toEqual({
        type: 'SET_END_DATE', 
        endDate: moment(0)
    });
});
