import { useState } from "react";
import Card from "../components/Card.jsx";
import TaskItem from "../components/TaskItem.jsx";

export default function Tasks({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [filter, setFilter] = useState("todas");

  function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: title.trim(), subject: subject.trim(), done: false }]);
    setTitle("");
    setSubject("");
  }

  const toggle = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const clearDone = () => setTasks(tasks.filter((t) => !t.done));

  const visible = tasks.filter((t) =>
    filter === "todas" ? true : filter === "pendentes" ? !t.done : t.done
  );

  return (
    <Card title="Minhas tarefas">
      <form className="form row" onSubmit={addTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nova tarefa..." />
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Matéria (opcional)" />
        <button className="btn">Adicionar</button>
      </form>

      <div className="filters">
        {["todas", "pendentes", "concluídas"].map((f) => (
          <button key={f} className={filter === f ? "chip active" : "chip"} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
        <button className="chip" onClick={clearDone}>Limpar concluídas</button>
      </div>

      {visible.length === 0 ? (
        <p className="muted">Nenhuma tarefa por aqui.</p>
      ) : (
        <ul className="tasks">
          {visible.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={toggle} onRemove={remove} />
          ))}
        </ul>
      )}
    </Card>
  );
}
