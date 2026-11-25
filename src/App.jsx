import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import Pomodoro from "./pages/Pomodoro.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  // Estado global das tarefas, persistido no navegador
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("studyflow-tasks")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("studyflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Navbar pending={tasks.filter((t) => !t.done).length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home tasks={tasks} />} />
          <Route path="/tarefas" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>
      <footer className="footer">StudyFlow · feito com React</footer>
    </>
  );
}
