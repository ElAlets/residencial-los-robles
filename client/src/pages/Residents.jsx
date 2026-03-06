import { useEffect, useState } from "react";
import { getResidents } from "../services/residentService";

function Residents() {

  const [residents, setResidents] = useState([]);

  useEffect(() => {

    const loadResidents = async () => {

      try {

        const data = await getResidents();
        setResidents(data);

      } catch (error) {

        console.error("Error loading residents:", error);

      }

    };

    loadResidents();

  }, []);

  return (
    <div>

      <h2>Residents</h2>

      <ul>

        {residents.map((r) => (
          <li key={r.id}>
            {r.address} - {r.phone}
          </li>
        ))}

      </ul>

    </div>
  );

}

export default Residents;