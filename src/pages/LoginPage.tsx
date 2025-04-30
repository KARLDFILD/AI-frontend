import { SubmitHandler, useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
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
import { getToken } from "@/utils/getToken";

interface LoginForm {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const form = useForm<LoginForm>({
    defaultValues: {
      email: "user2@mail.ru",
      password: "123",
    },
  });

  const submit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        data,
        { withCredentials: true }
      );

      const accessToken = getToken();
      if (accessToken) {
        const decoded = jwtDecode(accessToken);
        console.log(decoded);
      } else {
        console.error("Токен отсутствует или недоступен");
      }
      navigate("/");
      return response.data;
    } catch (error: any) {
      console.error("Ошибка авторизации:", error);
      form.setError("root", {
        message: "Ошибка авторизации. Проверьте данные.",
      });
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center bg-background">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="w-[80%] sm:w-[40%] lg:w-[30%] flex flex-col gap-4 border-2 p-10 rounded-xl shadow-md bg-white"
        >
          <h1 className="flex items-center justify-center font-bold">
            Welcome back!
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Введите email" {...field} />
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
                    placeholder="Введите пароль"
                    {...field}
                  />
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
            className="w-[50%] bg-primary self-center hover:bg-secondary text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Login
          </Button>
          <div className="text-center text-sm text-gray-600">
            <p>Don't have an account?</p>
            <NavLink
              to="/registration"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              Sign up
            </NavLink>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
