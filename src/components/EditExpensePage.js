import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import RemoveModal from "./RemoveModal";

export class EditExpensePage extends React.Component {

    state = {
        removeClicked: false
    };

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.goToHome();
    } 

    onClick = () => {
        this.setState({removeClicked: true});
    }

    handleRemoveYes = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.goToHome();
    }

    handleRemoveNo = () => {
        this.setState({removeClicked: false});
    }

    goToHome = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onClick}>Remove Expense</button>
                </div>
                <RemoveModal 
                    removeClicked={this.state.removeClicked}
                    handleRemoveYes={this.handleRemoveYes}
                    handleRemoveNo={this.handleRemoveNo}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps )(EditExpensePage);