import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
