import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import produce from "immer";
import CashDrawer from "./CashDrawer";

const ADDTOBEGINNING = "ADDTOBEGINNING";
const ADDTOEND = "ADDTOEND";
const INSERTTRANSACTION = "INSERTTRANSACTION";
const REMOVETRANSACTION = "REMOVETRANSACTION";
const REMOVETRANSACTIONBYID = "REMOVETRANSACTIONBYID";
const SELECTTYPE = "SELECTTYPE";

export const addToBeginning = (transaction) => ({
  type: ADDTOBEGINNING,
  transaction: transaction,
});

export const addToEnd = (transaction) => ({
  type: ADDTOEND,
  transaction: transaction,
});

export const insertTransaction = (payload) => ({
  type: INSERTTRANSACTION,
  payload: payload,
});

export const removeTransaction = (index) => ({
  type: REMOVETRANSACTION,
  index: index,
});

export const removeTransactionById = (id) => ({
  type: REMOVETRANSACTIONBYID,
  id: id,
});

export const selectType = (transactionType) => ({
  type: SELECTTYPE,
  transactionType: transactionType,
})

const initialState = [
  { id: 0, type: "SALE", value: 3.99 },
  { id: 1, type: "REFUND", value: -1.99 },
  { id: 2, type: "SALE", value: 17.49 },
];

const reducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case ADDTOBEGINNING:
      draft.unshift(action.transaction);
      return draft;
    case ADDTOEND:
      draft.push(action.transaction);
      return draft;
    case INSERTTRANSACTION:
      draft.splice(action.payload.index, 0, action.payload.transaction);
      return draft;
    case REMOVETRANSACTION:
      draft.splice(action.index, 1);
      return draft;
    case REMOVETRANSACTIONBYID:
      return draft.filter(transaction => transaction.id !== action.id);
    case SELECTTYPE:
      return draft.filter(transaction => transaction.type === action.transactionType );
    default:
      return draft;
  }
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);

store.dispatch(addToBeginning({ id: 3, type: "DEPOSIT", value: 11.0 }));
store.dispatch(addToEnd({ id: 4, type: "SALE", value: 5.25 }));
store.dispatch(
  insertTransaction({
    transaction: { id: 5, type: "SALE", value: 87.5 },
    index: 1,
  })
);
store.dispatch(removeTransaction(2));
store.dispatch(removeTransactionById(0));
// store.dispatch(selectType("SALE"))


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <CashDrawer />
    </Provider>
  </StrictMode>
);
