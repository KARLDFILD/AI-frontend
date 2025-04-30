import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { NavLink } from "react-router-dom";

function MainContent() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState(0);
  const [characterId, setCharacterId] = useState(0);

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

  const getSession = async (character_id: number) => {
    try {
      const accessToken = getToken();
      const response = await axios.post(
        "http://localhost:5000/api/chat/get-dialog",
        { character_id: character_id },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        setSessionId(response.data.id);
        return response.data.id;
      }
      return null;
    } catch (error) {
      console.error("Ошибка при получении сессии:", error);
      return null;
    }
  };

  const createChatSession = async (characterId: number) => {
    try {
      const accessToken = getToken();
      const response = await axios.post(
        "http://localhost:5000/api/chat/create",
        { characterId: characterId, context_history: [] },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const newSessionId = response.data.id;
      setSessionId(newSessionId);
      return newSessionId;
    } catch (error) {
      console.error("Ошибка при создании сессии:", error);
      return null;
    }
  };

  const clickOnCharacter = async (characterId: number) => {
    try {
      setCharacterId(characterId);

      let currentSessionId = await getSession(characterId);

      if (!currentSessionId) {
        currentSessionId = await createChatSession(characterId);
      }
    } catch (error) {
      console.error("Ошибка при обработке клика:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full md:w-3xl bg-white">
      <div className="mt-5">
        <h2 className="text-xl font-bold">Список персонажей:</h2>
        <ul className="list-disc list-inside">
          {characters.map((char) => (
            <li
              key={char.id}
              className="m-3 border-2 p-2"
              onClick={() => clickOnCharacter(char.id)}
            >
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
