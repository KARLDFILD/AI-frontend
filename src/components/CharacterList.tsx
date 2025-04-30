import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/getToken";

function CharacterList() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
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

  useEffect(() => {
    console.log("Сообщение обновлено:", messages);
  });

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

  const getMessages = async (character_id: number, chat_session_id: number) => {
    try {
      const accessToken = getToken();
      const response = await axios.post(
        "http://localhost:5000/api/message/get-messages",
        { character_id, chat_session_id },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setMessages((prev) => {
        const updatedMessages = [...prev, ...response.data];

        return updatedMessages;
      });
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
    }
  };

  const clickOnCharacter = async (characterId: number) => {
    try {
      setCharacterId(characterId);

      let currentSessionId = await getSession(characterId);

      if (!currentSessionId) {
        currentSessionId = await createChatSession(characterId);
      }

      if (currentSessionId) {
        await getMessages(characterId, currentSessionId);
      }
    } catch (error) {
      console.error("Ошибка при обработке клика:", error);
    }
  };

  return (
    <div className="flex">
      <div className="mt-5">
        <h2 className="text-xl font-bold">Список персонажей:</h2>
        <ul className="list-disc list-inside">
          {characters.map((char) => (
            <li
              key={char.id}
              className="m-3 border-2 p-2"
              onClick={() => clickOnCharacter(char.id)}
            >
              {char.name} - {char.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterList;
