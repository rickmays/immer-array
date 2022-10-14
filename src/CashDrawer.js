import { connect } from "react-redux";
import "./CashDrawer.css";

const CashDrawer = (props) => {
  const { transactions } = props;
  return (
    <div className="container">
      <h2>Transactions</h2>
      <ul className="list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction">
            <span className="trans-id">{transaction.id}</span>
            <span className="trans-type">{transaction.type}</span>
            <span className="trans-value">{transaction.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapState = (state) => ({
  transactions: state,
});

export default connect(mapState)(CashDrawer);
