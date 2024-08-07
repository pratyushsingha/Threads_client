import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { passwordStrength } from "check-password-strength";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PassStrengthBar from "@/components/PaawordStrengthBar";
import Container from "@/components/Container";
import InputDiv from "@/components/InputDiv";
import { useToast } from "@/components/ui/use-toast";

const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty("email is required")
      .email("email format isn't valid"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, { message: "Password must be 8 or more characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    fullName: z.string().nonempty("name is required"),
    username: z
      .string()
      .nonempty()
      .regex(/^\w{3,}$/),
    cnfPassword: z.string(),
  })
  .refine((data) => data.password == data.cnfPassword, {
    message: "password doesn't match",
    path: ["cnfPassword"],
  });

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      cnfPassword: "",
      fullName: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passStrength, setPassStrength] = useState(-1);
  const [loader, setLoader] = useState(false);

  const registerUser = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("username", data.username);
      formData.append("avatar", data.avatar ? avatar[0] : "");
      formData.append("fullName", data.fullName);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoader(false);
      toast({
        title: "success",
        description: `welcome ${response.data.data.username}`,
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.message}`,
      });
      // console.log(error);
      setLoader(false);
      // setProgress(progress + 100);
    }
  };
  return (
    <Container>
      <Container className="flex justify-center items-center mt-20">
        <Card className="w-[400px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Threads</CardTitle>
            <CardDescription>Create Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>
              <InputDiv
                label="Avatar"
                type="file"
                name="picture"
                accept="image/png, image/jpg, image/jpeg"
                {...register("avatar", {
                  required: true,
                })}
              />
              <InputDiv
                label="Username"
                placeholder="enter your username"
                {...register("username", {
                  required: true,
                })}
              />
              <p className="text-red-600">{errors.username?.message}</p>
              <InputDiv
                label="Name"
                placeholder="enter your name"
                {...register("fullName", {
                  required: true,
                })}
              />
              <p className="text-red-600">{errors.fullName?.message}</p>
              <InputDiv
                label="email"
                type="email"
                placeholder="enter your email"
                {...register("email", {
                  required: true,
                })}
              />
              <p className="text-red-600">{errors.email?.message}</p>
              <div className="relative grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password: </Label>
                <Input
                  label="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  {...register("password", {
                    required: true,
                  })}
                  onChange={(e) => {
                    e.target.value !== ""
                      ? setPassStrength(passwordStrength(e.target.value).id)
                      : setPassStrength(-1);
                  }}
                />
                <div className="absolute bottom-1 right-2 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="rounded-full  mt-10 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff color="#ffffff" />
                    ) : (
                      <Eye color="#ffffff" />
                    )}
                  </button>
                </div>
              </div>
              <PassStrengthBar passStrength={passStrength} />
              <p className="text-red-600">{errors.password?.message}</p>
              <div className="relative grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="cnfpassword">Confirm Password: </Label>
                <Input
                  id="cnfpassword"
                  type={!showPassword && "password"}
                  placeholder="confirm password"
                  {...register("cnfPassword", {
                    required: true,
                  })}
                />
                <p className="text-red-600">{errors.cnfPassword?.message}</p>
              </div>
              <div>
                <Button disabled={isSubmitting} className="w-full">
                  {loader && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  create account
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-center flex-col space-y-3">
            <div className="flex">
              <p>Already have an account? </p>
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                ‎ Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </Container>
  );
};

export default Register;
