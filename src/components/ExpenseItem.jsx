import { Component } from "react";
import "./ExpenseItem.css";
import { MdEdit, MdDelete } from "react-icons/md";

const ExpenseItem = ({ expense, handleDelete }) => {
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{expense.charge}</span>
        <span className="amount"> {expense.amount}원</span>
      </div>
      <div>
        <button className="edit-btn">
          <MdEdit className="btn-icon" />
        </button>
        <button
          className="clear-btn"
          onClick={() => {
            handleDelete(expense.id);
          }}
        >
          <MdDelete className="btn-icon" />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
