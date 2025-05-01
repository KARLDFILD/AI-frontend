import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function MainContent() {
  const [characters, setCharacters] = useState<any[]>([]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/character/get-all",
        { withCredentials: true }
      );
      setCharacters(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="flex flex-col h-full w-full md:w-3xl bg-white">
      <div className="mt-5">
        <h2 className="text-xl font-bold">Список персонажей:</h2>
        <ul className="list-disc list-inside">
          {characters.map((char) => (
            <li key={char.id} className="m-3 border-2 p-2">
              <NavLink to={`/character/${char.id}`}>
                {char.name} - {char.description}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainContent;
