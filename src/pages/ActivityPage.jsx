import { useEffect, useState } from "react";
import { Button, Spinner } from "@/components/Index";
import { useGetAllActivitiesQuery } from "@/services/activityAPI";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  setAllActivitiesPage,
  setFollowActivitiesPage,
  setLikeActivitiesPage,
  setReplyActivitiesPage,
  setRepostActivitiesPage,
} from "@/features/paginationSlice";
import { activityRoutes } from "@/utils/Index";
import ActivityCard from "@/components/ActivityCard";

export const AllActivities = () => {
  const { allActivitiesPage } = useSelector((store) => store.pagination);
  const [allActivities, setAllActivities] = useState([]);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const {
    data: activities,
    isLoading: activitiesLoading,
    isError: activitiesError,
  } = useGetAllActivitiesQuery({ filter: "all", page: allActivitiesPage });

  useEffect(() => {
    if (activities) {
      setAllActivities((prevActivities) => [
        ...prevActivities,
        ...activities.activities,
      ]);
    }
  }, [activities]);

  useEffect(() => {
    if (!user?._id) return;

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_ID, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
      encrypted: true,
    });

    const channel = pusher.subscribe(`userActivity-${user._id}`);

    const handleNewActivity = (data) => {
      setAllActivities((prevActivities) => [data, ...prevActivities]);
    };

    const events = ["like", "reply", "repost", "follow"];
    events.forEach((event) => {
      channel.bind(event, handleNewActivity);
    });

    return () => {
      events.forEach((event) => {
        channel.unbind(event, handleNewActivity);
      });
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [user?._id]);

  if (activitiesLoading) return <Spinner />;
  if (activitiesError) return <p>Something went wrong</p>;

  return (
    <InfiniteScroll
      dataLength={allActivities.length}
      next={() => dispatch(setAllActivitiesPage())}
      hasMore={activities.hasNextPage === true ? true : false}
      loader={<Spinner />}
    >
      {allActivities?.length > 0 ? (
        allActivities.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))
      ) : (
        <p>No activity found</p>
      )}
    </InfiniteScroll>
  );
};

export const LikeActivities = () => {
  const { likeActivitiesPage } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();
  const {
    data: likeActivitiesData,
    isLoading: likeActivitiesLoading,
    isError: likeActivitiesError,
  } = useGetAllActivitiesQuery({ filter: "like", page: likeActivitiesPage });

  if (likeActivitiesLoading) return <Spinner />;
  if (likeActivitiesError) return <p>Something went wrong</p>;

  return (
    <InfiniteScroll
      dataLength={likeActivitiesData?.activities.length}
      next={() => dispatch(setLikeActivitiesPage())}
      hasMore={likeActivitiesData?.hasNextPage}
      loader={<Spinner />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {likeActivitiesData?.activities.length > 0 ? (
        likeActivitiesData?.activities.map((activity) => (
          <ActivityCard key={activity?._id} activity={activity} />
        ))
      ) : (
        <p>No activity found</p>
      )}
    </InfiniteScroll>
  );
};

export const ReplyActivities = () => {
  const { replyActivitiesPage } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();

  const {
    data: replyActivitiesData,
    isLoading: replyActivitiesLoading,
    isError: replyActivitiesError,
  } = useGetAllActivitiesQuery({ filter: "reply", page: replyActivitiesPage });

  if (replyActivitiesLoading) return <Spinner />;
  if (replyActivitiesError) return <p>Something went wrong</p>;

  return (
    <InfiniteScroll
      dataLength={replyActivitiesData?.activities.length}
      next={() => dispatch(setReplyActivitiesPage())}
      hasMore={replyActivitiesData?.hasNextPage}
      loader={<Spinner />}
    >
      {replyActivitiesData?.activities.length > 0 ? (
        replyActivitiesData?.activities.map((activity) => (
          <ActivityCard key={activity?._id} activity={activity} />
        ))
      ) : (
        <p>No activity found</p>
      )}
    </InfiniteScroll>
  );
};
export const FollowActivities = () => {
  const { followActivitiesPage } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();

  const {
    data: followActivitiesData,
    isLoading: followActivitiesLoading,
    isError: followActivitiesError,
  } = useGetAllActivitiesQuery({
    filter: "follow",
    page: followActivitiesPage,
  });

  if (followActivitiesLoading) return <Spinner />;
  if (followActivitiesError) return <p>Something went wrong</p>;

  return (
    <InfiniteScroll
      dataLength={followActivitiesData?.activities.length}
      next={() => dispatch(setFollowActivitiesPage())}
      hasMore={followActivitiesData?.hasNextPage}
      loader={<Spinner />}
    >
      {followActivitiesData?.activities.length > 0 ? (
        followActivitiesData?.activities.map((activity) => (
          <ActivityCard key={activity?._id} activity={activity} />
        ))
      ) : (
        <p>No activity found</p>
      )}
    </InfiniteScroll>
  );
};

export const RepostActivities = () => {
  const { repostActivitiesPage } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();

  const {
    data: repostActivitiesData,
    isLoading: repostActivitiesLoading,
    isError: repostActivitiesError,
  } = useGetAllActivitiesQuery({
    filter: "repost",
    page: repostActivitiesPage,
  });

  if (repostActivitiesLoading) return <Spinner />;
  if (repostActivitiesError) return <p>Something went wrong</p>;

  return (
    <InfiniteScroll
      dataLength={repostActivitiesData?.activities.length}
      next={() => dispatch(setRepostActivitiesPage())}
      hasMore={repostActivitiesData?.hasNextPage}
      loader={<Spinner />}
    >
      {repostActivitiesData?.activities.length > 0 ? (
        repostActivitiesData?.activities.map((activity) => (
          <ActivityCard key={activity?._id} activity={activity} />
        ))
      ) : (
        <p>No activity found</p>
      )}
    </InfiniteScroll>
  );
};

const ActivityPage = () => {
  const location = useLocation();
  return (
    <section className="p-5">
      <div className="flex justify-normal md:items-center md:justify-center space-x-2 md:space-x-3 overflow-x-auto md:overflow-x-hidden whitespace-nowrap ">
        {activityRoutes.map((activityFilter) => (
          <NavLink
            className={`${
              location.pathname.split("/").pop() === activityFilter.path &&
              "bg-white text-black font-bold"
            } border px-5 py-2 rounded-lg my-2`}
            key={activityFilter._id}
            to={
              activityFilter.path === "activity"
                ? "/activity"
                : `/activity/${activityFilter.path}`
            }
          >
            {activityFilter.title}
          </NavLink>
        ))}
      </div>
      <div className="py-4">
        <Outlet />
      </div>
    </section>
  );
};

export default ActivityPage;
