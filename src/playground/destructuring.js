// const person = {
//     name: 'Abhijeet',
//     age: 39,
//     location: {
//         city: 'Mumbai',
//         temp: 92
//     }
// };

// const {name, age, location} = person;

// console.log(`${name} is ${age}.`); 
// console.log(`it's ${location.temp} in ${location.city}.`);  

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// // const {publisher} = book;
// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

const item = ['Coffee (cold)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice, ] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);