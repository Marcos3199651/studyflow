import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";

export default function Home({ tasks }) {
  const done = tasks.filter((t) => t.done).length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <>
      <section className="hero">
        <h1>Organize seus estudos, foque no que importa.</h1>
        <p>Lista de tarefas por matéria e um timer Pomodoro, tudo em uma só página.</p>
        <Link to="/tarefas" className="btn">Começar agora</Link>
      </section>

      <div className="grid">
        <Card title="Seu progresso">
          <div className="progress"><div style={{ width: `${percent}%` }} /></div>
          <p>{done} de {tasks.length} tarefas concluídas ({percent}%)</p>
        </Card>
        <Card title="Tarefas">Cadastre, filtre e conclua atividades por matéria.</Card>
        <Card title="Pomodoro">Alterne entre foco e pausa com um timer configurável.</Card>
      </div>
    </>
  );
}
