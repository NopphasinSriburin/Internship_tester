import React from "react";
import "./ResumePage.css";
import profilePicture from "./images/Me.jpg"; // Correctly import the image

function ResumePage() {
  const resume = {
    name: "Nopphasin Sriburin",
    position: "Internship Programmer",
    email: "Nopphasin.Sriburin@gmail.com",
    phone: "098-036-7568",
    Gitlink: "https://github.com/NopphasinSriburin",
    summary: `Passionate Front-End Developer & UX/UI Designer with experience in React.js, Next.js, 
    HTML, CSS, JavaScript, and Figma. Skilled in building responsive web interfaces, optimizing 
    user experience, and integrating APIs. Always eager to learn and improve. Seeking an internship 
    opportunity to apply my skills and grow in a professional environment.`,
    education: `Bachelor of Science, Faculty of Interdisciplinary Studies, 
    Computer and Information Science (3rd year) Khon Kaen University (Nong Khai Campus)`,
    skills: [
      "Python, SQL, C#",
      "HTML, CSS, ReactJS, JavaScript, PHP",
      "MySQL, MongoDB, Firebase",
      "GitHub, VS Code, Figma, Visual Studio, Postman, Cisco"
    ],
    languages: ["Thai", "English"],
    profilePicture: profilePicture,
    portfolio: [
      {
        title: "Calculate the grade",
        description: "C# Project to calculate the grade order of the grades.",
        date: "March 30, 2023",
      },
      {
        title: "Pokemon Battle",
        description: "C# Project where you select 3 Pokemon to battle, with counter attacks and defeats.",
        date: "March 30, 2023",
      },
      {
        title: "BackEnd-Code",
        description: "HTML project borrowing data to display or calling an API to display data.",
        date: "April 4, 2024",
      },
      {
        title: "Japanese Culture Web Page",
        description: "TypeScript project creating a web page about introducing Japanese culture.",
        date: "October 25, 2024",
      },
      {
        title: "FlutterPokemon",
        description: "Flutter project fetching an API and displaying details about Pokemon status.",
        date: "January 27, 2024",
      }
    ]
  };

  return (
    <div className="resume-container">
      <header className="resume-header">
        <img className="profile-image" src={resume.profilePicture} alt="Profile" />
        <div className="header-text">
          <h1>{resume.name}</h1>
          <p>{resume.position}</p>
        </div>
      </header>
      <section className="resume-body">
        <div className="resume-section left-section">
          <h2>Contact Information</h2>
          <p>Email: <a href={`mailto:${resume.email}`}>{resume.email}</a></p>
          <p>Phone: {resume.phone}</p>
          <p>GitHub: <a href={resume.Gitlink} target="_blank" rel="noopener noreferrer">{resume.Gitlink}</a></p>
          <h2>About Me</h2>
          <p>{resume.summary}</p>
          <h2>Education</h2>
          <p>{resume.education}</p>
          <h2>Skills</h2>
          <ul>
            {resume.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h2>Languages</h2>
          <ul>
            {resume.languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
        <div className="resume-section right-section">
          <h2>Portfolio</h2>
          {resume.portfolio.map((project, index) => (
            <div key={index} className="portfolio-item">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>Date:</strong> {project.date}</p>
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ResumePage;
