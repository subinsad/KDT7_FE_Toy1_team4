import { useEffect } from 'react';
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user === null) {
            navigate("/logintest");
        }
    }, [navigate]);

    return children;
}
