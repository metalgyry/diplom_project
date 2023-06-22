import React, { createContext } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import User from './stores/user.store';
import Chat from './stores/chat.store';
import Project from './stores/project.store';

export const Context = createContext(null)

ReactDOMClient.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{
        userStore: new User(),
        chatStore: new Chat(),
        projectStore: new Project(),
    }}>
        <App />
    </Context.Provider>
);
