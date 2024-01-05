import { Link } from "react-router-dom";
const Error404Page = () => {
    return (
        <>
            <div>This page does not exist</div>
            <div>
                <Link to='/'>Back</Link>
            </div>
        </>

    )
}

export default Error404Page;