import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import {
  AppContext,
  Button,
  Spinner,
  useToast,
  profileRoutes,
} from "@/components/Index";

const Profile = () => {
  const { toast } = useToast();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const { progress, setProgress, currentUserDetails } = useContext(AppContext);
  const [userDetails, setUserDetails] = useState([]);

  const getUserProfile = async () => {
    setLoading(true);
    setProgress(progress + 30);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/profile/u/${username}`,
        { withCredentials: true }
      );
      //   console.log(response.data);
      setUserDetails(response.data.data);
      setLoading(false);
      setProgress(progress + 100);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.message}`,
      });
      setLoading(false);
      setProgress(progress + 100);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  loading && <Spinner />;

  return (
    <div>
      {userDetails.length > 0 ? (
        userDetails.map((user) => (
          <div key={user._id}>
            <p>@{user.username}</p>
            <img className="w-10 h-10 rounded-full" src={user.avatar} alt="" />
            <p className="uppercase font-bold">{user.fullName}</p>
            <p>joined {moment(user.createdAt).format("MMM Do YY")}</p>
            <p>{user.followersCount} followers</p>
            <p>{user.followingCount} following</p>
            {user._id === currentUserDetails._id ? (
              <Link to={`/profile/${currentUserDetails.username}/edit`}>
                <Button>edit Profile</Button>
              </Link>
            ) : (
              <Button>{user.isFollowing ? "Unfollow" : "Follow"}</Button>
            )}
            <div className="flex space-x-3">
              {profileRoutes.map(({ _id, title, path }) => (
                <Link key={_id} to={path}>
                  <p>{title}</p>
                </Link>
              ))}
              {user._id === currentUserDetails._id && (
                <Link to={`/profile/${currentUserDetails.username}/edit`}>
                  <p>Edit Profile</p>
                </Link>
              )}
            </div>
            <Outlet />
          </div>
        ))
      ) : (
        <p>User doesn't exists</p>
      )}
    </div>
  );
};

export default Profile;
