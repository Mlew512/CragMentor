import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Error404Page = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="text-center mb-4">
                <h1 className="display-4">This page does not exist.</h1>
            </div>
            <div>
                <Link className="btn btn-primary" onClick={() => navigate(-1)}>
                    Go Back
                </Link>
            </div>
        </div>
    );
}

export default Error404Page;