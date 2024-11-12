import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 1600 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 1200 },
  ]);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState();
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map(expense => {
          return expense.id === id ? {...expense, charge, amount} : expense
        })

        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({type: 'success', text: '지출 내역이 수정되었습니다.'})
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({
          type: "success",
          text: "새로운 지출 내역이 생성되었습니다.",
        });
      }
      setCharge("");
      setAmount("");
    } else {
      console.error("error");
      handleAlert({
        type: "danger",
        text: "지출 항목은 빈 값일 수 없으며 비용은 0보다 커야합니다.",
      });
    }
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "지출 내역이 삭제되었습니다." });
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((expense) => expense.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  const clearExpenses = () => {
    setExpenses([])
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearExpenses={clearExpenses}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <p style={{ fontSize: "2rem" }}>
          총 지출:
          <span>
            {expenses.reduce((acc, cur) => {
              return (acc += cur.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
};

export default App;
