import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>);

