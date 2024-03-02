import { sidebarItems } from "@/utils";
import { Button } from "./ui/button";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster.jsx";
import { ThemeProvider } from "@/context/theme-provider.jsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Login from "@/pages/auth/Login.jsx";
import App from "@/App";
import Home from "@/pages/Home";
import AppContextProvider from "@/context/AppContext";
import Register from "@/pages/auth/Register.jsx";
import TweetCard from "@/components/TweetCard";
import Spinner from "@/components/loader/Spinner";
import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import CommentCard from "@/components/CommentCard";

export {
  sidebarItems,
  Button,
  Container,
  Sidebar,
  AppContext,
  TweetCard,
  Spinner,
  useToast,
  Home,
  Register,
  AppContextProvider,
  Toaster,
  ThemeProvider,
  Login,
  App,
  Label,
  Input,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  CommentCard,
};
