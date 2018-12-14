import React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

const render = () => {
    const AppComponent = require("./src/app.jsx").App;
    ReactDOM.render(
        <AppContainer>
            <AppComponent/>
        </AppContainer>,
        document.getElementById("app-container")
    );
};

render();

if (module.hot) {
    module.hot.accept(render);
}