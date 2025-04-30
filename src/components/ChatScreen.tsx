import Chat from "./Chat";
import ChatSettings from "./ChatSettings";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { useParams } from "react-router-dom";
import { CharacterInfo } from "@/types/CharacterInfo";

function ChatScreen() {
  const { id } = useParams();
  const characterId = id ? parseInt(id, 10) : 0;
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo | null>(
    null
  );

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

        let avatar = "https://via.placeholder.com/50";
        if (
          response.data.character_picture &&
          response.data.character_picture.data
        ) {
          const binary = response.data.character_picture.data;
          const base64String = btoa(
            binary.reduce(
              (data: string, byte: number) => data + String.fromCharCode(byte),
              ""
            )
          );
          avatar = `data:image/jpeg;base64,${base64String}`;
        }

        setCharacterInfo({
          name: response.data.name,
          avatar,
          description: response.data.description,
          creator_id: response.data.creator_id,
          creator_name: response.data.user.user_name,
        });
      } catch (error) {
        console.error("Ошибка получения информации о персонаже:", error);
      }
    };

    if (characterId) {
      fetchCharacterInfo();
    }
  }, [characterId]);

  return (
    <div className="flex h-full w-full bg-white">
      <div className="w-full flex flex-col items-center">
        <Chat characterInfo={characterInfo} />
      </div>
      <div className="hidden lg:block w-[400px]">
        <ChatSettings characterInfo={characterInfo} />
      </div>
    </div>
  );
}

export default ChatScreen;
