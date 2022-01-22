import { login, logout, startLogin, startLogout } from '../../actions/auth';

test('should setup auth action object for login',()=>{
    const uid = '123';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('should setup auth action object for logout',()=>{
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});
