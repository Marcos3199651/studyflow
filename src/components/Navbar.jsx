import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Início" },
  { to: "/tarefas", label: "Tarefas" },
  { to: "/pomodoro", label: "Pomodoro" },
  { to: "/contato", label: "Contato" },
];

export default function Navbar({ pending }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <span className="logo">📚 StudyFlow</span>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
        ☰
      </button>
      <nav className={open ? "nav open" : "nav"}>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end onClick={() => setOpen(false)}>
            {l.label}
            {l.to === "/tarefas" && pending > 0 && <span className="badge">{pending}</span>}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
