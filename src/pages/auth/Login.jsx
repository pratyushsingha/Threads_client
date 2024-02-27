import { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { AppContext } from "@/context/AppContext";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/Container";
import InputDiv from "@/components/InputDiv";

const loginSchema = z.object({
  username: z
    .string()
    .nonempty("username is required")
    .min(3, { message: "username is too short" }),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, { message: "Password must be 8 or more characters long" }),
});

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(null);
  const [loader, setLoader] = useState(false);
  const { progress, setProgress } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const loginUser = async (data) => {
    setLoader(true);
    setProgress(progress + 30);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        {
          username: data.username,
          password: data.password,
        },
        { withCredentials: true }
      );
      toast({
        title: "success",
        description: `welcome back ${response.data.data.user.username}`,
      });
      navigate("/");

      setLoader(false);
      setProgress(100);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.message}`,
      });
      // console.log(error);
      setLoader(false);
      setProgress(progress + 100);
    }
  };

  return (
    <Container className="flex justify-center items-center mt-20">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">DevCom</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(loginUser)}>
            <InputDiv
              label="username"
              placeholder="enter your username"
              {...register("username", {
                required: true,
              })}
            />
            <p className="text-red-600">{errors.username?.message}</p>
            <div className="relative grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password: </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                {...register("password", {
                  required: true,
                })}
              />
              <div className="absolute bottom-1 right-2 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="rounded-full  mt-10 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <p className="text-red-600">{errors.password?.message}</p>
            <div className="text-sm">
              <Link
                to="/forget-password"
                className="flex justify-end font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forget password?
              </Link>
            </div>
            <div>
              <Button disabled={isSubmitting} className="w-full">
                {loader && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                login
              </Button>
            </div>
          </form>
          <div className="flex justify-center items-center space-x-3 my-2">
            <Separator className="w-32" />
            <span className="text-gray-400">or</span>
            <Separator className="w-32" />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p>not a member? </p>
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            ‎ signup
          </Link>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default Login;
