import { useState } from "react";
import api from "../services/api";

function Payments() {

  const [form, setForm] = useState({
    resident_id: "",
    amount: "",
    method: "simulated_online"
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/payments", {
        ...form,
        payment_date: new Date(),
        status: "paid"
      });

      alert("Pago registrado correctamente");

    } catch (error) {

      console.error(error);
      alert("Error al registrar pago");

    }

  };

  return (
    <div>

      <h2>Registrar Pago</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="resident_id"
          placeholder="ID del residente"
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Monto"
          onChange={handleChange}
        />

        <select name="method" onChange={handleChange}>
          <option value="simulated_online">Online</option>
          <option value="cash">Efectivo</option>
          <option value="transfer">Transferencia</option>
        </select>

        <button type="submit">Guardar</button>

      </form>

    </div>
  );

}

export default Payments;