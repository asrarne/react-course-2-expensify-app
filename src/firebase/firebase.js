// import firebase from 'firebase';
// import 'firebase/database';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getDatabase, ref, set, update, remove, onValue, push, child, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database';
import { getDatabase, ref } from 'firebase/database';
// import moment from "moment";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app);
// const database = firebase.database();

const db = getDatabase();
const dbExpenseRef = ref(db, 'expenses');


// onValue(dbRef, (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
//   }, {
//     onlyOnce: false
//   });

// onChildAdded(dbRef, (data) => {
//      console.log('onChildAdded: ' + data.key + '-->' + JSON.stringify(data.val()) );   
//     // addCommentElement(postElement, data.key, data.val().text, data.val().author);
// });

// onChildChanged(dbRef, (data) => {
//     console.log('onChildChanged: ' + data.key + '-->' + JSON.stringify(data.val()) );   
//     // setCommentValues(postElement, data.key, data.val().text, data.val().author);
// });

// onChildRemoved(dbRef, (data) => {
//     console.log('onChildRemoved: ' + data.key + '-->' + JSON.stringify(data.val()) );   
//     // deleteComment(postElement, data.key);
// });


// console.log(database);
// set(ref(db), {  name: 'Abhijeet Rane',
//                 age: 39,
//                 stressLevel: 6,
//                 job: {
//                     title: 'Software developer',
//                     company: 'Google'
//                 },
//                 location: {
//                     country: 'India',
//                     city: 'Mumbai'
//                 }   
//             }).then(()=>{
//                 console.log('Data is saved');
//              }).catch((e) => {
//                 console.log('error: ', e);
//             });

// const updates = {
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Bangalore'
// };

// update(ref(db), updates)
//     .then(()=>{
//         console.log('Update successfully');
//     })
//     .catch((e)=>{
//         console.log('Error in update: ',e);
//     });
// const updates = {age: 39};

// updates['/location/city'] = 'Thane';

// update(ref(db), updates).then(() => {
//     console.log('update 1 is successful');
// }).catch((e) => {
//     console.log('update 1 failed:', e);
// });

// remove(ref(db,'expenses'))
//     .then(() => {
//         console.log('removed expenses');
//     })
//     .catch((e) => {
//         console.log('remove failed: ',e);
//     });

// update(ref(db), {
//     attributes: {
//         height: 175,
//         weight: 65
//     }
// }).then(() => {
//     console.log('update 2 is successful');
// }).catch((e) => {
//     console.log('update 2 failed:', e);
// });

export {db, dbExpenseRef as default};

// const readRef = ref(db);
// onValue(readRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(`${data.name} is a ${data.job.title}`);
// });

// setTimeout(() => {
//     update(ref(db),{name: 'Shivaji Rane'});
// }, 3500);
// const expenses = [
//                     {
//                         description:'Description of first expense',
//                         note: 'Note of first expense',
//                         amount: 1000.45,
//                         createdAt: moment().valueOf()
//                     },
//                     {
//                         description:'Description of second expense',
//                         note: 'Note of second expense',
//                         amount: 2000.45,
//                         createdAt: moment().add(4, 'days').valueOf()
//                     },
//                     {
//                         description:'Description of third expense',
//                         note: 'Note of third expense',
//                         amount: 3000.45,
//                         createdAt: moment().add(15,'days').valueOf()
//                     }
//                 ];

// expenses.map((expense, index) => {
    // const newExpenseRef = push(ref(db, 'expenses'));
    // set(newExpenseRef, expense)
    //     .then(()=>{
    //         console.log('added expense ' + (index + 1));
    //     }).catch((e) => {
    //         console.log('failed with error: ', e);
    //     });
// });


