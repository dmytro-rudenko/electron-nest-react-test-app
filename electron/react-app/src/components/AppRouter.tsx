// src/components/AppRouter.tsx
import React from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';

import AddUser from './AddUser';
import Login from './Login';

const AppRouter: React.FC = () => {
    return (
        <HashRouter>
            <h1>React TypeScript App</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
            <Routes>
                <Route path="/" element={<AddUser />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </HashRouter>
    );
};

export default AppRouter;