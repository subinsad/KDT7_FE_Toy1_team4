import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    const userId = useSelector((state) => state.user.userInfo.userId);

    if (userId === null) {
        navigate('/login');
    }

    return <>{children}</>;
};

export default ProtectedRoute;
