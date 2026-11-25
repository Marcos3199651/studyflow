import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";

export default function Pomodoro() {
  const [focusMin, setFocusMin] = useState(25);
  const [mode, setMode] = useState("foco");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (seconds > 0) return;
    // Troca automática entre foco e pausa
    if (mode === "foco") {
      setCycles((c) => c + 1);
      setMode("pausa");
      setSeconds(5 * 60);
    } else {
      setMode("foco");
      setSeconds(focusMin * 60);
    }
  }, [seconds, mode, focusMin]);

  function reset() {
    setRunning(false);
    setMode("foco");
    setSeconds(focusMin * 60);
  }

  function changeFocus(e) {
    const value = Number(e.target.value);
    setFocusMin(value);
    if (!running && mode === "foco") setSeconds(value * 60);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <Card title="Pomodoro" className="center">
      <p className={`mode ${mode}`}>{mode === "foco" ? "Hora de focar" : "Pausa"}</p>
      <div className="timer">{mm}:{ss}</div>
      <div className="row center">
        <button className="btn" onClick={() => setRunning(!running)}>
          {running ? "Pausar" : "Iniciar"}
        </button>
        <button className="btn ghost" onClick={reset}>Reiniciar</button>
      </div>
      <label className="muted">
        Foco (min):{" "}
        <select value={focusMin} onChange={changeFocus}>
          {[15, 25, 30, 45, 50].map((m) => <option key={m}>{m}</option>)}
        </select>
      </label>
      <p className="muted">Ciclos concluídos: {cycles}</p>
    </Card>
  );
}
