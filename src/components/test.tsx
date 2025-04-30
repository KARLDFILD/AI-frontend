interface GetCharacter {
  id: number;
}

const { register: characterInput, handleSubmit: handleGetCharacter } =
  useForm<GetCharacter>({
    defaultValues: {
      id: 25,
    },
  });

const submitCharacter: SubmitHandler<GetCharacter> = async (data) => {
  try {
    const accessToken = getToken();

    const response = await axios.post(
      "http://localhost:5000/api/character/get-one",
      { id: data.id },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Response data:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Ошибка получения персонажа:", error);
    setMessage(error.response?.data?.message || "Ошибка получения персонажа");
  }
};

{
  isAuthenticated && (
    <form
      className="border-2 flex flex-col gap-5 w-xl p-3"
      onSubmit={handleGetCharacter(submitCharacter)}
    >
      <input className="border-2" type="number" {...characterInput("id")} />
      <button className="border-2">Send</button>
    </form>
  );
}
