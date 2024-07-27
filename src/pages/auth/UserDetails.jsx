import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";

import { passwordStrength } from "check-password-strength";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  useToast,
  InputDiv,
  Button,
  PassStrengthBar,
  Spinner,
} from "@/components/Index";
import { useDispatch, useSelector } from "react-redux";

const passwordSchema = z.object({
  oldPassword: z.string().nonempty("old password is required"),
  newPassword: z
    .string()
    .nonempty("new password is required")
    .min(8, { message: "new password must be 8 or more characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

const UpdateUserDetails = ({ user }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const userOldDetails = () => {
    setValue("firstName", user.fullName.split(" ")[0]);
    setValue("lastName", user.fullName.split(" ")[1]);
    setValue("email", user.email);
    setValue("tags", user.tags);
    setValue("bio", user.bio);
    setValue("portfolio", user.portfolio);
  };
  const updateProfile = async (data) => {
    setLoading(true);
    try {
      const newData = { ...data };
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
        {
          ...newData,
          fullName: `${newData.firstName} ${newData.lastName}`,
        },
        { withCredentials: true }
      );
      toast({
        title: "success",
        description: `${response.data.message}`,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: `${error.response.data.message}`,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    userOldDetails();
  }, []);

  useEffect(() => {
    isSubmitSuccessful && dispatch(getUserDetails(user.username));
  }, [isSubmitSuccessful]);

  return s;
};

// const UpdateAvatar = ({ user }) => {
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isDirty, isTouched, isSubmitSuccessful },
//     watch,
//   } = useForm({
//     defaultValues: {
//       avatar: "",
//     },
//   });

//   const { avatar } = watch();

//   const updateAvatar = async (data) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("avatar", data.avatar[0]);
//       await axios.patch(
//         `${import.meta.env.VITE_BACKEND_URL}/users/avatar`,
//         formData,
//         { withCredentials: true }
//       );
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (avatar) {
//       const imageUrl = URL.createObjectURL(avatar[0]);
//       setPreviewImage(imageUrl);
//     } else {
//       setPreviewImage(user.avatar);
//     }
//   }, [avatar]);

//   useEffect(() => {
//     isSubmitSuccessful && dispatch(getUserDetails(user.username));
//   }, [isSubmitSuccessful]);

//   return (
//     <>
//       <form onSubmit={handleSubmit(updateAvatar)}>
//         <input
//           accept="image/png, image/jpg, image/jpeg"
//           type="file"
//           {...register("avatar")}
//         />
//         {loading && <Spinner />}
//         {previewImage && <img src={previewImage} alt="Preview" />}
//         <p className="text-red-600">{errors.avatar?.message}</p>
//         <Button
//           type="submit"
//           disabled={isSubmitSuccessful || (!isDirty && !isTouched)}
//         >
//           Update
//         </Button>
//       </form>
//     </>
//   );
// };

// const UpdateCoverImage = ({ user }) => {
//   const [loading, setLoading] = useState(false);
//   const [previewCoverImage, setPreviewCoverImage] = useState(null);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isDirty, isTouched, isSubmitSuccessful },
//     watch,
//   } = useForm({
//     defaultValues: {
//       coverImage: "",
//     },
//   });

//   const { coverImage } = watch();
//   const updateCoverImage = async (data) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("coverImage", data.coverImage[0]);
//       await axios.patch(
//         `${import.meta.env.VITE_BACKEND_URL}/users/coverimage`,
//         formData,
//         { withCredentials: true }
//       );
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (coverImage) {
//       const imageUrl = URL.createObjectURL(coverImage[0]);
//       setPreviewCoverImage(imageUrl);
//     } else {
//       setPreviewCoverImage(user.coverImage);
//     }
//   }, [coverImage]);

//   useEffect(() => {
//     isSubmitSuccessful && dispatch(getUserDetails(user.username));
//   }, [isSubmitSuccessful]);

//   return (
//     <>
//       <form onSubmit={handleSubmit(updateCoverImage)}>
//         <input
//           accept="image/png, image/jpg, image/jpeg"
//           type="file"
//           {...register("coverImage")}
//         />
//         {loading && <Spinner />}
//         {previewCoverImage && <img src={previewCoverImage} alt="Preview" />}
//         <p className="text-red-600">{errors.coverImage?.message}</p>
//         <Button
//           type="submit"
//           disabled={isSubmitSuccessful || (!isDirty && !isTouched)}
//         >
//           Update
//         </Button>
//       </form>
//     </>
//   );
// };

const UpdatePassword = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [cnfShowPassword, setCnfShowPassword] = useState(false);
  const [passStrength, setPassStrength] = useState(-1);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isTouched, isSubmitting, isSubmitSuccessful },
    setValue,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  const changePassword = async (data) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/change-password`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          withCredentials: true,
        }
      );
      toast({
        title: "success",
        description: `${response.data.message}`,
      });
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.response.data.message}`,
      });

      setLoading(false);
    }
  };
  return (
    <div className="border-2 border-dotted rounded border-red-500 p-3">
      <p className="text-center mb-5 font-semibold">Change password</p>
      <form onSubmit={handleSubmit(changePassword)}>
        <div className="justify-center">
          <div className="flex justify-center space-x-6">
            <div className="relative">
              <InputDiv
                className="w-full"
                label="Old password"
                type={showPassword ? "text" : "password"}
                {...register("oldPassword", {
                  required: true,
                })}
                placeholder="enter old password"
              />
              <div className="absolute bottom-6 right-2 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="rounded-full  mt-8 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div className="relative">
              <InputDiv
                className="w-full"
                label="New password"
                type={cnfShowPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: true,
                })}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setPassStrength(passwordStrength(e.target.value).id)
                    : setPassStrength(-1);
                }}
                placeholder="enter new password"
              />
              <div className="absolute bottom-6 right-2 flex items-center">
                <button
                  type="button"
                  onClick={() => setCnfShowPassword(!cnfShowPassword)}
                  className="rounded-full  mt-10 w-7 h-7 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
                >
                  {cnfShowPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <PassStrengthBar passStrength={passStrength} />
            </div>
          </div>
          <div className="flex justify-between mt-3 mr-9">
            <div className="flex flex-col space-y-2">
              <p className="text-red-600">{errors.oldPassword?.message}</p>
              <p className="text-red-600">{errors.newPassword?.message}</p>
            </div>
            <Button
              disabled={isSubmitting || (!isDirty && !isTouched)}
              type="submit"
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const UserDetails = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      {/* <UpdateUserDetails user={user} />
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
        </CardHeader>
        <CardDescription>
          <UpdateAvatar user={user} />
          <UpdateCoverImage user={user} />
        </CardDescription>
      </Card>
      <UpdatePassword /> */}
    </>
  );
};

export default UserDetails;
