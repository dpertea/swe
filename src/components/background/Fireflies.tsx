import React, { useEffect, useState } from "react";
import "./fireflies.scss";

const Fireflies: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const SKILLS = [
    "JavaScript",
    "TypeScript",
    "NodeJS",
    "React",
    "Angular",
    "NestJS",
    "GraphQL",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Java",
    "C#",
    "Python",
    "FastAPI",
    "Flask",
    "AWS",
    "Docker",
    "HTML",
    "CSS",
    "Git",
    "Graphql",
    "NextJS",
    "NestJS",
    "Jest",
    "Cypress",
    "Webpack",
    "CI/CD",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  /* binary 0 and 1s:
  return (
    <div id="background-wrapper">
      {Array.from({ length: quantity }, (_, i) => {
        const bit = Math.random() < 0.5 ? "0" : "1";
        return <div className="firefly" data-char={bit} key={i} />;
      })}
    </div>
  );*/

  /* skills */
  // pick `quantity` random skills once

  return (
    <div id="background-wrapper">
      {SKILLS.map((skill: string, i: number) => (
        <div className="firefly" data-char={skill} key={i} />
      ))}
    </div>
  );
};

export default Fireflies;
