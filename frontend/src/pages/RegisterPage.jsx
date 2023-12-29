import { useNavigate, useOutletContext } from "react-router-dom";
import SignUp from "../component/SignUp";
import LogIn from "../component/LogIn";
import { useEffect, useState } from "react";

export const RegisterPage = () => {
    const { user, setUser } = useOutletContext();
    const [existingUser, setExistingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);
    return (
        <>
        {existingUser ? (
            <LogIn setUser={setUser} setExistingUser={setExistingUser} existingUser={existingUser}/>   
        ) : (
            <SignUp setUser={setUser} setExistingUser={setExistingUser}existingUser={existingUser}/>   
        )}
        </>
    );
};
