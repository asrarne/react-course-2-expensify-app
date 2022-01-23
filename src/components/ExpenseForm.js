import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
// import Decimal from 'decimal.js';


export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }
    

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Please provide description and amount.'}));
        } else {
            this.setState(()=> ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                //(Math.round(num1 * 100) / 100).toFixed(2))
                //(Math.round(this.state.amount * 100)).toFixed(2))
                amount: parseFloat((parseFloat(this.state.amount, 10) * 100.00).toFixed(2)),
                // amount: (Math.round(this.state.amount * 100)/100).toFixed(2),
                createdAt: this.state.createdAt.valueOf() 
            });
            // console.log('submitted', this.state.amount);
            // console.log('submitted', parseFloat(this.state.amount).toFixed(2) * 100);
            // console.log('submitted', typeof((parseFloat(this.state.amount, 10) * 100).toFixed(2)));
            // console.log('submitted', typeof(parseFloat((parseFloat(this.state.amount, 10) * 100.00).toFixed(2))));
            // console.log('submitted', typeof(parseFloat(this.state.amount, 10) * 100.00));
        }
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(()=>({ amount }));
            // console.log('amount: ', amount);
            // console.log('this.state.amount: ', this.state.amount);
            // console.log('parseFloat: ', parseFloat(this.state.amount, 10) * 100 );
        }
    };

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input 
                    type="text" 
                    placeholder="Description"
                    className="text-input" 
                    autoFocus 
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                    />
                <input 
                    type="text" 
                    placeholder="Amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    />
                <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />    
                <textarea 
                    placeholder="Add a note for your expense (optional)"
                    className="textarea"
                    value = {this.state.note}
                    onChange={this.onNoteChange}
                    ></textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    }
}