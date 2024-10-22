import { useEffect, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import Container from "@/components/Container";
import InputDiv from "@/components/InputDiv";
import { Checkbox } from "@/components/Index";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/services/authAPI";
import { setAuthState, setIsAuthenticated } from "@/features/authSlice";

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
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(null);
  const [login, { isLoading }] = useLoginMutation();
  const { isAuthenticated } = useSelector((store) => store.auth);
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data) => {
    try {
      const response = await login(data).unwrap();
      navigate("/");
      dispatch(
        setAuthState({
          user: response.data.user,
          token: response.data.accessToken,
        }),
        setIsAuthenticated(true)
      );
      dispatch(
        setAuthState({
          user: response.data.user,
          token: response.data.accessToken,
        }),
        setIsAuthenticated(true)
      );
      toast({
        title: `Welcome back ${response.data.user.username}`,
      });
      
      dispatch(
        setAuthState({
          user: response.data.user,
          token: response.data.accessToken,
        }),
        setIsAuthenticated(true)
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.data?.message || error.status,
      });
    }
  };

  return (
    <Container className="flex justify-center items-center mt-20">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Threads</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
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
            {/* <div className="text-sm">
              <Link
                to="/forget-password"
                className="flex justify-end font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forget password?
              </Link>
            </div> */}
            {/* <div className="flex items-center space-x-2">
              <Checkbox
                defaultChecked={true}
                onCheckedChange={(value) => setRememberMe(value)}
                id="rememberMe"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div> */}
            <div>
              <Button disabled={isSubmitting} className="w-full">
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
            </div>
          </form>
          <div className="flex justify-center items-center space-x-3 my-2">
            <Separator className="w-32" />
            <span className="text-gray-400">or</span>
            <Separator className="w-32" />
          </div>
          <Link
            to={`${
              import.meta.env.VITE_BACKEND_URL
            }/users/login/federated/google`}
          >
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </Link>
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
