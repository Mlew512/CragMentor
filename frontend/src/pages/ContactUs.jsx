import { Container, Row, Col, Card } from "react-bootstrap";
import halseyImg from "../images/TeamPhotos/halsey.jpg";
import mattimg from "../images/TeamPhotos/mattprofile.jpeg";
import derekimg from "../images/TeamPhotos/derekprofile.jpg";
import termottoimg from "../images/TeamPhotos/termotto.jpg";

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
      name: "Jon Prado",
      position: "Software Engineer",
      imageUrl: "",
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
    <Container>
      <h1 className="mt-5 mb-4">Meet Our Team</h1>
      <Row>
        {teamMembers.map((member, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={member.imageUrl}
                alt={`${member.name}'s picture`}
              />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {member.position}
                </Card.Subtitle>
                <Card.Text>
                  Connect with {member.name} on:
                  <ul className="list-unstyled mt-3">
                    <li>
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </li>
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
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ContactPage;
