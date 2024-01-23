import Carousel from 'react-bootstrap/Carousel';
import background1 from '../images/FrontPage/background1.jpg'
import background2 from '../images/FrontPage/background2.jpg'
import background3 from '../images/FrontPage/background3.jpg'
import background4 from '../images/FrontPage/background4.jpg'
import background5 from '../images/FrontPage/background5.jpg'
import background8 from '../images/FrontPage/background8.jpg'
import "../pages/HomePage.css"


function CarouselComponent() {
  return (
    
    <Carousel className='w-10' data-bs-theme="dark" >
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 h-100"
          src={background1}
          alt="First slide"
        />
        <Carousel.Caption>
          {/* <h5>El Salto, Mexico</h5>
          <p>Tecolote Cave</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 h-100"
          src={background8}
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 h-100"
          src={background3}
          alt="Third slide"
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 h-100"
          src={background4}
          alt="Fourth slide"
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 h-100"
          src={background5}
          alt="Fifth slide"
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;