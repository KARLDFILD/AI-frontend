import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RegistrationForm {
  user_name: string;
  email: string;
  password: string;
  avatar: FileList;
}

function RegistrationPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);
  const form = useForm<RegistrationForm>({
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      avatar: undefined,
    },
  });

  const submit: SubmitHandler<RegistrationForm> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("user_name", data.user_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.avatar?.length > 0) {
        formData.append("avatar", data.avatar[0]);
      }

      const response = await axios.post(
        "http://localhost:5000/api/user/registration",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Успешная регистрация");
      navigate("/login");
      return response.data;
    } catch (error: any) {
      console.error("Ошибка регистрации:", error);
      form.setError("root", {
        message: "Ошибка регистрации. Проверьте данные.",
      });
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="w-[80%] sm:w-[40%] lg:w-[30%] flex justify-center flex-col gap-4 border-2 p-10 rounded-xl shadow-md bg-white"
        >
          <h1 className="flex items-center justify-center font-bold">
            Welcome!
          </h1>
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      name={name}
                      ref={ref}
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(e.target.files);
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name);
                        } else {
                          setFileName(null);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="block w-full py-2 px-4 rounded-md text-sm font-semibold bg-background text-secondary hover:bg-blue-100 text-center truncate">
                      {fileName || "Upload Avatar"}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm text-center">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Register
          </Button>
          <div className="text-center text-sm text-gray-600">
            <p>Already have an account?</p>
            <NavLink
              to="/login"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              Log in
            </NavLink>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegistrationPage;
