export default function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className={task.done ? "task done" : "task"}>
      <label>
        <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
        <span>{task.title}</span>
      </label>
      <span className={`tag ${task.subject ? "" : "hidden"}`}>{task.subject}</span>
      <button className="icon-btn" onClick={() => onRemove(task.id)} aria-label="Remover">
        ✕
      </button>
    </li>
  );
}
