import { useEffect, useState } from "react";
import { getEmergencyServices } from "../services/emergencyService";

function Emergency() {

  const [services, setServices] = useState([]);

  useEffect(() => {

    const loadServices = async () => {

      try {

        const data = await getEmergencyServices();
        setServices(data);

      } catch (error) {

        console.error(error);

      }

    };

    loadServices();

  }, []);

  return (
    <div>

      <h2>Servicios de Emergencia</h2>

      {services.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.phone}</p>
          <p>{s.address}</p>
        </div>
      ))}

    </div>
  );

}

export default Emergency;