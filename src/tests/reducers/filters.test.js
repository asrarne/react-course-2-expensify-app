import moment from "moment";
import filterReducers from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filterReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortby to amount', () => {
    const state = filterReducers(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortby to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const state = filterReducers(currentState, { type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

// should set text filter
test('should set text filter', ()=>{
    const state = filterReducers(undefined, {type: 'SET_TEXT_FILTER', text: 'e'});
    expect(state.text).toBe('e');
})

// shoul set startDate filter
test ('should set start date filter', () => {
    const state = filterReducers(undefined, { type: 'SET_START_DATE', startDate: moment(0)});
    expect(state.startDate).toEqual(moment(0));
});

// should set endDate filter
test ('should set end date filter', () => {
    const state = filterReducers(undefined, { type: 'SET_END_DATE', endDate: moment(0)});
    expect(state.endDate).toEqual(moment(0));
});