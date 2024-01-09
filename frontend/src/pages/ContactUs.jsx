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
      aboutMe:"fill out",
    },
    {
      name: "Matthew Lewis",
      position: "Software Engineer",
      imageUrl: mattimg,
      mountainlink:"https://www.mountainproject.com/user/200177473/matthew-lewis",
      linkedinUrl: "https://www.linkedin.com/in/matthew-lewis-b40398184/",
      githubUrl: "https://github.com/Mlew512",
      aboutMe:`As an enthusiastic rock climber with motivation for challenging terrains, I've transitioned from a role as a Trauma ICU nurse to a dedicated software developer. My passion lies in problem-solving and creating user-friendly solutions that have a meaningful impact on people's lives each day. Whether I'm bouldering in Chattanooga, sport climbing in Spain, or tackling T-Wall's gear placements, I find inspiration in both physical and digital challenges. Committed to continuous improvement, I bring an adaptive leadership approach to foster the best in others. My journey involves not only scaling heights on rocky surfaces but also elevating the possibilities in the world of software development.`,
    },
    {
      name: "John Prado",
      position: "Software Engineer",
      imageUrl: john,
      linkedinUrl: "https://www.linkedin.com/in/john-prado-01876523a/",
      githubUrl: "https://github.com/PradoJohn",
      aboutMe:"I'm a Software Engineer who loves tackling tech puzzles as much as I enjoy hiking through Hawaii's trails. Always on the lookout for the next adventure, whether it's in code or in the great outdoors. My journey is all about exploring new horizons, in tech and in life!",
    },
    {
      name: "Derek Marion",
      position: "Software Engineer",
      imageUrl: derekimg,
      linkedinUrl: "https://www.linkedin.com/in/derek-marion-9b6a4370/",
      githubUrl: "https://github.com/derekmarion",
      aboutMe:"I find joy in building efficient and effective software that is actually useful in everyday life. When I'm not coding, I'm climbing, skiing, and surfing.",
    },
    {
      name: "Michael Termotto",
      position: "Software Engineer",
      imageUrl: termottoimg,
      linkedinUrl: "https://www.linkedin.com/in/michael-termotto-2b6800277/",
      githubUrl: "https://github.com/CustomDesignBuildStudios",
      aboutMe:"fill out",
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
                    {member.aboutMe &&(
                      <p>{member.aboutMe}</p>
                    )}
                </Card.Text>
              </Card.Body>
            </Card>
        </Row>
      ))}
    </Container>
  );
};

export default ContactPage;
