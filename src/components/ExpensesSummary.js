import React from "react";
import { connect } from "react-redux";
import selectExpenseTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => (
    <div>
        <p>Viewing {props.expenseCount} expenses totalling {numeral(props.expensesTotal/100).format('$0,0.00')}</p>
    </div>
);

const mapStateToProps = (state) => ({
    expenseCount: state.expenses.length,
    expensesTotal: selectExpenseTotal(state.expenses)
});

export default connect(mapStateToProps)(ExpensesSummary);