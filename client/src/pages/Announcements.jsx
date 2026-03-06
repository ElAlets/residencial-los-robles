import { useEffect, useState } from "react";
import { getAnnouncements } from "../services/announcementService";

function Announcements() {

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {

    const loadAnnouncements = async () => {

      try {

        const data = await getAnnouncements();
        setAnnouncements(data);

      } catch (error) {

        console.error("Error loading announcements:", error);

      }

    };

    loadAnnouncements();

  }, []);

  return (
    <div>

      <h2>Anuncios</h2>

      {announcements.map((a) => (
        <div key={a.id}>
          <h3>{a.title}</h3>
          <p>{a.content}</p>
        </div>
      ))}

    </div>
  );

}

export default Announcements;