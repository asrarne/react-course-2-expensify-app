import moment from "moment";

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 155,
    createdAt: moment(0).valueOf()
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 123400,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},{
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];
