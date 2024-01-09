import { Container, Row, Col, Card } from "react-bootstrap";
import halseyImg from "../images/TeamPhotos/halsey.jpg";
import mattimg from "../images/TeamPhotos/mattprofile.jpeg";
import derekimg from "../images/TeamPhotos/derekprofile.jpg";
import termottoimg from "../images/TeamPhotos/termotto.jpg";
import john from "../images/TeamPhotos/John.jpg"
import "./ContactUs.css"
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";


const ContactPage = () => {
  const teamMembers = [
    {
      name: "Halsey Filbin",
      position: "Software Engineer",
      imageUrl: halseyImg,
      linkedinUrl: "https://www.linkedin.com/in/halsey-filbin/",
      githubUrl: "https://github.com/hfilbin10",
    },
    {
      name: "Matt Lewis",
      position: "Software Engineer",
      imageUrl: mattimg,
      mountainlink:"https://www.mountainproject.com/user/200177473/matthew-lewis",
      linkedinUrl: "https://www.linkedin.com/in/matthew-lewis-b40398184/",
      githubUrl: "https://github.com/Mlew512",
    },
    {
      name: "John Prado",
      position: "Software Engineer",
      imageUrl: john,
      linkedinUrl: "https://www.linkedin.com/in/john-prado-01876523a/",
      githubUrl: "https://github.com/PradoJohn",
    },
    {
      name: "Derek Marion",
      position: "Software Engineer",
      imageUrl: derekimg,
      linkedinUrl: "https://www.linkedin.com/in/derek-marion-9b6a4370/",
      githubUrl: "https://github.com/derekmarion",
    },
    {
      name: "Michael Termotto",
      position: "Software Engineer",
      imageUrl: termottoimg,
      linkedinUrl: "https://www.linkedin.com/in/michael-termotto-2b6800277/",
      githubUrl: "https://github.com/CustomDesignBuildStudios",
    },
  ];

  return (
    <Container fluid className="d-flex flex-column">
      <h1 className="text-center">Meet Our Team</h1>
        {teamMembers.map((member, index) => (
        <Row key={index} className="justify-content-center">
            <Card id="contact-card" className="d-flex flex-row">
              <div className="contact-info">
                <img
                  id="contact-img"
                  variant="top"
                  src={member.imageUrl}
                  alt={`${member.name}'s picture`}
                  />
                <ul className="d-flex mt-3 justify-content-center">
                  <a
                    className="me-1"
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  ><FaLinkedin size={35}/></a>
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    ><FaGithub color="black" size={35}/>
                  </a>
                </ul>
              </div>
              <Card.Body>
                <Card.Title><h2>{member.name}</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <h5>{member.position}</h5>
                </Card.Subtitle>
                <Card.Text>
                  {member.mountainlink && (
                        <li>
                          <a
                            href={member.mountainlink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Mountain Project
                          </a>
                        </li>
                      )}
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, eum exercitationem excepturi accusamus, fuga et velit similique, iusto quisquam doloremque a. Amet perferendis, temporibus ratione itaque at doloremque ipsum cum!
                    </p>
                </Card.Text>
              </Card.Body>
            </Card>
        </Row>
      ))}
    </Container>
  );
};

export default ContactPage;
