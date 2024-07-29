import { Button, Input, Spinner } from "@/components/Index";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useLazySearchUserQuery,
  useUserSuggetionsQuery,
} from "@/services/authAPI";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useHandleFollowMutation } from "@/services/followAPI";

const SearchPage = () => {
  const [searchUser, setSearchUser] = useState("");
  const debounceQuery = useDebounce(searchUser, 500);
  const searchInputRef = useRef(null);
  const { user: currentUser } = useSelector((store) => store.auth);

  const [handleFollow] = useHandleFollowMutation();

  const [
    trigger,
    {
      data: searchedUser,
      error: searchedUserError,
      isLoading: searchedUserLoading,
    },
  ] = useLazySearchUserQuery();

  const {
    data: userSuggestions,
    error: userSuggestionsError,
    isLoading: userSuggestionLoading,
  } = useUserSuggetionsQuery();

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (debounceQuery) {
      trigger(debounceQuery);
    }
  }, [debounceQuery]);

  const users = debounceQuery ? searchedUser : userSuggestions;

  return (
    <section className="p-5">
      <Input
        ref={searchInputRef}
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="my-2"
        placeholder="Search"
      />
      {(searchedUserLoading || userSuggestionLoading) && <Spinner />}
      {(searchedUserError || userSuggestionsError) && (
        <p>something went wrong</p>
      )}
      {users?.map((user) => (
        <Link to={`/profile/${user.username}`} key={user._id}>
          <div className="flex justify-between my-3">
            <div className="flex space-x-2">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-slate-500 mb-2">{user.fullName}</p>
                <p>{user.followerCount} followers</p>
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                user._id === currentUser._id
                  ? null
                  : handleFollow({
                      followerId: user._id,
                      username: user.username,
                      searchQuery: debounceQuery,
                    });
              }}
              variant="outline"
              className="self-center"
            >
              {user._id === currentUser._id ? (
                <Link to={`/profile/${currentUser.username}`}>
                  <FaChevronRight />
                </Link>
              ) : user.isFollowing === true ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </Button>
          </div>
          <hr />
        </Link>
      ))}
    </section>
  );
};

export default SearchPage;
