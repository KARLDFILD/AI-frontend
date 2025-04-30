import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { getToken } from "../utils/getToken";

interface CharacterCreationForm {
  name: string;
  description: string;
  settings: string;
  character_picture: FileList;
  isPublic: boolean;
}

function CharacterCreation() {
  const { register, handleSubmit } = useForm<CharacterCreationForm>();

  const submit: SubmitHandler<CharacterCreationForm> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("settings", data.settings);
      formData.append("isPublic", String(data.isPublic));

      if (data.character_picture.length > 0) {
        formData.append("character_picture", data.character_picture[0]);
      }
      const accessToken = getToken();

      const response = await axios.post(
        "http://localhost:5000/api/character/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Персонаж создан");

      return response.data;
    } catch (error: any) {
      console.error("Ошибка создания персонажа:", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className="border-2 flex flex-col gap-5 w-xl p-3"
        onSubmit={handleSubmit(submit)}
      >
        <p>Name:</p>
        <input className="border-2" type="text" {...register("name")} />
        <p>Description:</p>
        <input className="border-2" type="text" {...register("description")} />
        <p>Settings:</p>
        <input className="border-2" type="text" {...register("settings")} />
        <p>Открытый доступ:</p>
        <input className="border-2" type="checkbox" {...register("isPublic")} />
        <p>Picture:</p>
        <input
          className="border-2"
          type="file"
          {...register("character_picture")}
        />
        <button className="border-2">Send</button>
      </form>
    </div>
  );
}

export default CharacterCreation;
