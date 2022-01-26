import { getAuth,
         signInWithPopup,
         signOut } from 'firebase/auth';


export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = (provider) => {
    return () => {
        const auth = getAuth();
        // const provider = new GoogleAuthProvider();
        // provider.setCustomParameters({ 'prompt': 'select_account' });
        return signInWithPopup(auth, provider);
    };    
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        const auth = getAuth();
        return signOut(auth);
    };
};