import React, { useEffect, useState } from "react";
import { fetchSeminars } from "../services/seminarService";
import SeminarItem from "./SeminarItem";

interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

const SeminarList: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSeminars = async () => {
      try {
        const data = await fetchSeminars();
        setSeminars(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load seminars");
        setLoading(false);
      }
    };

    loadSeminars();
  }, []);

  const handleSeminarDeleted = (id: number) => {
    setSeminars((prevSeminars) =>
      prevSeminars.filter((seminar) => seminar.id !== id)
    );
  };

  const handleSeminarUpdated = (updatedSeminar: Seminar) => {
    setSeminars((prevSeminars) =>
      prevSeminars.map((seminar) =>
        seminar.id === updatedSeminar.id ? updatedSeminar : seminar
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          onDeleted={() => handleSeminarDeleted(seminar.id)}
          onUpdated={() => handleSeminarUpdated(seminar)}
        />
      ))}
    </div>
  );
};

export default SeminarList;
