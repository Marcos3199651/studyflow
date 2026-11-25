import { useState } from "react";
import Card from "../components/Card.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 3) err.name = "Informe seu nome.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "E-mail inválido.";
    if (form.message.trim().length < 10) err.message = "Escreva pelo menos 10 caracteres.";
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  }

  return (
    <Card title="Fale com a gente">
      {sent && <p className="success">Mensagem enviada com sucesso! 🎉</p>}
      <form className="form" onSubmit={submit} noValidate>
        <input name="name" value={form.name} onChange={update} placeholder="Nome" />
        {errors.name && <small className="error">{errors.name}</small>}
        <input name="email" value={form.email} onChange={update} placeholder="E-mail" />
        {errors.email && <small className="error">{errors.email}</small>}
        <textarea name="message" rows="4" value={form.message} onChange={update} placeholder="Mensagem" />
        {errors.message && <small className="error">{errors.message}</small>}
        <button className="btn">Enviar</button>
      </form>
    </Card>
  );
}
