import { StrictMode } from "react";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.ts"; // No need to import persistor anymore
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
        <ToastContainer position="top-right" />
            <App />
        </Provider>
    </StrictMode>,
);
