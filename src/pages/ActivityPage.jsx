import { useEffect, useState } from "react";
import { Spinner } from "@/components/Index";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetAllActivitiesQuery } from "@/services/activityAPI";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const activityType = new Map([
  ["like", "Liked your tweet"],
  ["reply", "Replied to your tweet"],
  ["repost", "Reposted your tweet"],
  ["follow", "Followed you"],
]);

const ActivityPage = () => {
  const [allActivities, setAllActivities] = useState([]);
  const { user } = useSelector((store) => store.auth);

  const {
    data: activities,
    isLoading: activitiesLoading,
    isError: activitiesError,
  } = useGetAllActivitiesQuery();

  useEffect(() => {
    if (activities) {
      setAllActivities(activities);
    }
  }, [activities]);

  useEffect(() => {
    const pusher = new Pusher(`${import.meta.env.VITE_PUSHER_APP_ID}`, {
      cluster: `${import.meta.env.VITE_PUSHER_CLUSTER}`,
      encrypted: true,
    });

    const channel = pusher.subscribe(`userActivity-${user?._id}`);

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
    };
  }, [user?._id]);

  if (activitiesLoading) return <Spinner />;
  if (activitiesError) return <p>Something went wrong</p>;

  return (
    <section className="p-5">
      {allActivities?.length > 0 ? (
        allActivities?.map((activity) => (
          <Link
            to={`${
              activity.activityType === "like" ||
              activity.activityType === "reply" ||
              activity.activityType === "repost"
                ? `/tweet/${activity.pathId}`
                : `/profile/${activity.triggeredBy.username}`
            }`}
            key={activity._id}
          >
            <div className="flex space-x-2 mt-4">
              <Avatar>
                <AvatarImage src={activity.triggeredBy.avatar} />
                <AvatarFallback>{activity.triggeredBy.username}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex space-x-3">
                  <p className="font-bold">{activity.triggeredBy.username}</p>
                  <p className="self-center text-xs text-slate-500">
                    {moment(activity.createdAt).fromNow()}
                  </p>
                </div>
                <p className="text-sm text-slate-500 mb-5">
                  {activityType.get(activity.activityType)}
                </p>
              </div>
            </div>
            <hr />
          </Link>
        ))
      ) : (
        <p>No activity found</p>
      )}
    </section>
  );
};

export default ActivityPage;
