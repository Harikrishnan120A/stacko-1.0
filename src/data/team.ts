export type TeamMember = {
  id: number;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  portfolio?: string;
};

const team: TeamMember[] = [
  {
    id: 1,
    name: "Baala Ganesh R",
    title: "Co-Founder & Full-Stack Developer",
    specialty: "React, Node.js & Modern Web Development",
    bio: "Co-founder leading technical innovation and creating modern web applications with cutting-edge technologies",
    portfolio: "https://baalaganeshr.github.io/new-portfolio/",
  },
  {
    id: 2,
    name: "Madhan Kumar B",
    title: "Co-Founder & Software Engineer",
    specialty: "Full-stack Development & Product Strategy",
    bio: "Co-founder driving product vision and building scalable software solutions for complex challenges",
    portfolio: "https://madhankumar1000.github.io/portfoliomk/",
  },
  {
    id: 3,
    name: "Harikrishnan A",
    title: "Software Engineer & Product Developer",
    specialty: "Full-stack development & System Architecture",
    bio: "Building scalable software solutions and architecting robust systems for complex web applications",
    portfolio: "https://baalaganeshr.github.io/Harikrishnan-A/",
  },
  {
    id: 4,
    name: "Aathan J",
    title: "Frontend Developer & Creative Technologist",
    specialty: "Modern Frontend & Interactive Experiences",
    bio: "Specializing in innovative frontend technologies and crafting engaging interactive digital experiences",
    portfolio: "https://aathanj.github.io/AathanJ.github/",
  },
];

export default team;
