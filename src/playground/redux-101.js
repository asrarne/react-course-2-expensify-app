import {createStore} from 'redux';

//action generators  - function that returns action objects

const incrementCount = ({incrementBy=1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy=1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({count}) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

const countReducer = (state = {  count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
            // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;    
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };  
        case 'RESET':
            return {
                count: 0
            };    
        default:
            return state;            
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(incrementCount());

// unsubscribe();

store.dispatch(resetCount());
store.dispatch(decrementCount({decrementBy: 6}));
store.dispatch(decrementCount());
store.dispatch(setCount({count:101}));
