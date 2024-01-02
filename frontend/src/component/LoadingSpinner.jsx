
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const LoadingSpinner = ({isLoading, center=false}) => {
    if(isLoading){
        return (
            <>
                <div className={"spinner-container " + (center ? 'center' : '')}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </>
          );
    }
  
  
}
export default LoadingSpinner