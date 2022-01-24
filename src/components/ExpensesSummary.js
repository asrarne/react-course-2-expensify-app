import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectExpenseTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import selectHiddenExpenses from '../selectors/hiddenExpenses';
import selectNoFilterInPlace from '../selectors/noFilterInPlace';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCount, 
                                  expensesTotal, 
                                  hiddenExpenseCount,
                                  noFilterInPlace
                                   }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpenseTotal = numeral(expensesTotal/100).format('$0,0.00');
    const hiddenExpenseWord = hiddenExpenseCount > 0 ? 
                                ( hiddenExpenseCount === 1 ? 
                                    ('Not showing 1 expense because of filters.') : 
                                    (`Not showing ${hiddenExpenseCount} expenses because of filters.`) ) :
                                ('Showing all expenses' + (noFilterInPlace ? ', No filter in place.' : '.'));
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> { expenseWord } totalling <span>{formattedExpenseTotal}</span></h1>
                <p className="page-header__title">{hiddenExpenseWord}</p>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    const hiddenExpenses = selectHiddenExpenses(state.expenses, visibleExpenses);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpenseTotal(visibleExpenses),
        hiddenExpenseCount: hiddenExpenses.length,
        // hiddenExpenseTotal: selectExpenseTotal(hiddenExpenses),
        noFilterInPlace: selectNoFilterInPlace(state.filters)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);