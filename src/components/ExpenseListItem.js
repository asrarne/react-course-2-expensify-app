import React from "react";
import { Link } from "react-router-dom";

// stateless function component

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
            <p>{amount} - {createdAt}</p>
        </Link>
    </div>
);

export default ExpenseListItem;
