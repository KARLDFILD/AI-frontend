import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { useParams } from "react-router-dom";
import { CharacterInfo } from "@/types/CharacterInfo";
import Chat from "./Chat";
import ChatSettings from "./ChatSettings";
import useHistoryStore from "@/store/useHistoryStore";

function ChatScreen() {
  const { id } = useParams();
  const characterId = id ? parseInt(id, 10) : 0;
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(
    null
  );
  const addToHistory = useHistoryStore((state) => state.addToHistory);

  useEffect(() => {
    const fetchCharacterInfo = async () => {
      try {
        const accessToken = getToken();
        const response = await axios.post(
          "http://localhost:5000/api/character/get-one",
          { id: characterId },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const avatar =
          response.data.character_picture || "https://via.placeholder.com/50";

        const characterData = {
          name: response.data.name,
          avatar,
          description: response.data.description,
          creator_id: response.data.creator_id,
          creator_name: response.data.user.user_name,
        };

        setCharacterInfo(characterData);

        addToHistory({
          id: characterId,
          name: response.data.name,
          avatar,
        });
      } catch (error) {
        console.error("Ошибка получения информации о персонаже:", error);
      }
    };

    if (characterId) {
      fetchCharacterInfo();
    }
  }, [characterId, addToHistory]);

  return (
    <div className="flex h-full w-full bg-white">
      <div className="w-full flex flex-col items-center">
        <Chat characterInfo={characterInfo} />
      </div>
      <div className="hidden xl:block w-[400px]">
        <ChatSettings characterInfo={characterInfo} />
      </div>
    </div>
  );
}

export default ChatScreen;
