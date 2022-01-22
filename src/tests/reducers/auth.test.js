import authReducer from '../../reducers/auth';

test('should set default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should set id by login', () => {
    const action = {
        type: 'LOGIN',
        uid: '123'
    };
    const state = authReducer(undefined, action);
    expect(state).toEqual({ uid: '123' });
});

test('should reset id by logout', () => {
    const action = {
        type: 'LOGOUT',
        uid: '123'
    };
    const state = authReducer({ uid: '123' }, action);
    expect(state).toEqual({});
});