import { Container, Row, Col, Card } from "react-bootstrap";
import halseyImg from "../images/TeamPhotos/halsey.jpg";
import mattimg from "../images/TeamPhotos/mattprofile.jpeg";
import derekimg from "../images/TeamPhotos/derekprofile.jpg";
import termottoimg from "../images/TeamPhotos/termotto.jpg";
import john from "../images/TeamPhotos/John.jpg";
import "./ContactUs.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const ContactPage = () => {
  const teamMembers = [
    {
      name: "Matthew Lewis",
      position: "Software Engineer",
      imageUrl: mattimg,
      // mountainlink:"https://www.mountainproject.com/user/200177473/matthew-lewis",
      linkedinUrl: "https://www.linkedin.com/in/matthew-lewis-b40398184/",
      githubUrl: "https://github.com/Mlew512",
      aboutMe: `Whether I'm sport climbing in Spain, tackling T-Wall's roof cracks, or working on my next project in software development. I came up with cragmentor to help others structure their climbing by focusing on building a good foundation of endurance and fundamentals and to balance climbing at your limit to optimize upward progression.`,
    },
    {
      name: "Derek Marion",
      position: "Software Engineer",
      imageUrl: derekimg,
      linkedinUrl: "https://www.linkedin.com/in/derek-marion-9b6a4370/",
      githubUrl: "https://github.com/derekmarion",
      aboutMe:
        "I find joy in building efficient and effective software that is actually useful in everyday life. When I'm not coding, I'm climbing, skiing, and surfing.",
    },
    {
      name: "Halsey Filbin",
      position: "Software Engineer",
      imageUrl: halseyImg,
      linkedinUrl: "https://www.linkedin.com/in/halsey-filbin/",
      githubUrl: "https://github.com/hfilbin10",
      aboutMe:
        "I enjoy making applications that make it easier for people to get out and enjoy their passions. When I'm not working I enjoy hiking, playing sports and playing with my dogs, Mickey, Maple and Moab.",
    },
    {
      name: "John Prado",
      position: "Software Engineer",
      imageUrl: john,
      linkedinUrl: "https://www.linkedin.com/in/john-prado-01876523a/",
      githubUrl: "https://github.com/PradoJohn",
      aboutMe:
        "I'm a Software Engineer who loves tackling tech puzzles as much as I enjoy hiking through Hawaii's trails. Always on the lookout for the next adventure, whether it's in code or in the great outdoors. My journey is all about exploring new horizons, in tech and in life!",
    },
    {
      name: "Michael Termotto",
      position: "Software Engineer",
      imageUrl: termottoimg,
      linkedinUrl: "https://www.linkedin.com/in/michael-termotto-2b6800277/",
      githubUrl: "https://github.com/CustomDesignBuildStudios",
      aboutMe: "",
    },
  ];
  return (
    <Container fluid className="d-flex flex-column">
      <h1 className="text-center">Meet Our Team</h1>
      {teamMembers.map((member, index) => (
        <Row key={index} className="justify-content-center">
          <Card id="contact-card" className="mb-3 text-center">
            <div className="contact-info d-flex align-items-center justify-content-center min-img-container">
              <img
                id="contact-img"
                className="img-fluid rounded-circle mb-3 min-img" // Added min-img class
                src={member.imageUrl}
                alt={`${member.name}'s picture`}
              />
              <ul className="d-flex justify-content-center">
                <a
                  className="me-1"
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={35} />
                </a>
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub color="black" size={35} />
                </a>
              </ul>
            </div>
            <Card.Body>
              <Card.Title>
                <h2>{member.name}</h2>
              </Card.Title>
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
                {member.aboutMe && <p>{member.aboutMe}</p>}
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      ))}
    </Container>
  );
};

export default ContactPage;
