import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Redux/store";
import ThemeProvide from "./Components/ThemeProvide";
import { PrimeReactProvider } from "primereact/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvide>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </ThemeProvide>
    </PersistGate>
  </Provider>
);
