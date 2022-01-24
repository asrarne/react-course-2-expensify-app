

export default (expenses, filteredExpenses) => {
    return expenses
                .filter((expense) => !filteredExpenses.includes(expense));                     
};