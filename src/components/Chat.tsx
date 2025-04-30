import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { useParams } from "react-router-dom";
import { SendHorizontal } from "lucide-react";

interface MessageInput {
  message: string;
}

function Chat() {
  const { id } = useParams();
  const characterId = id ? parseInt(id, 10) : 0;

  const {
    register: messageArea,
    handleSubmit: handleSendMessage,
    reset,
  } = useForm<MessageInput>({
    defaultValues: {
      message: "",
    },
  });

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const accessToken = getToken();
        const response = await axios.post(
          "http://localhost:5000/api/chat/get-dialog",
          { character_id: characterId },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.data && response.data.id) {
          setSessionId(response.data.id);
        } else {
          const createResponse = await axios.post(
            "http://localhost:5000/api/chat/create",
            { characterId: characterId, context_history: [] },
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          setSessionId(createResponse.data.id);
        }
      } catch (error) {
        console.error("Ошибка инициализации сессии:", error);
      }
    };

    if (characterId) {
      initializeSession();
    }
  }, [characterId]);

  useEffect(() => {
    if (sessionId) {
      getMessages(characterId, sessionId);
    }
  }, [sessionId]);

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
      setMessages(response.data);
    } catch (error) {
      console.error("Ошибка при получении сообщений:", error);
    }
  };

  const submitMessage: SubmitHandler<MessageInput> = async (data) => {
    if (!data.message.trim()) return;

    try {
      const accessToken = getToken();

      const userMessage = {
        id: Date.now(),
        content: data.message,
        sender_type: "USER",
      };
      setMessages((prev) => [...prev, userMessage]);

      reset({ message: "" });

      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.style.height = "auto";
      }

      const response = await axios.post(
        "http://localhost:5000/api/message/send",
        {
          content: data.message,
          chat_session_id: sessionId,
          character_id: characterId,
          sender_type: "USER",
          tokens_used: 5,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data && response.data.aiMessage) {
        const modelMessage = {
          id: Date.now() + 1,
          content: response.data.aiMessage.content,
          sender_type: "MODEL",
        };
        setMessages((prev) => [...prev, modelMessage]);
      }
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full md:w-3xl bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 border-b border-gray-200 hideScroll">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
              message.sender_type === "USER"
                ? "bg-primary/30 text-right ml-auto"
                : "bg-gray-100 mr-auto"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <form
          className="flex gap-2 w-full relative"
          onSubmit={handleSendMessage(submitMessage)}
        >
          <textarea
            className="hideScroll border-2 w-full resize-none p-2 pr-14 h-16 min-h-[4rem] max-h-32 rounded-md focus:outline-none focus:border-primary overflow-y-auto"
            placeholder="Введите сообщение..."
            onInput={handleTextareaInput}
            {...messageArea("message")}
          />
          <button
            type="submit"
            className="absolute right-3 bottom-3 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-secondary"
          >
            <SendHorizontal size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
