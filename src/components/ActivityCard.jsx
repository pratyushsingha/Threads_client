import { Link } from "react-router-dom";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activityType = new Map([
  ["like", "Liked your tweet"],
  ["reply", "Replied to your tweet"],
  ["repost", "Reposted your tweet"],
  ["follow", "Followed you"],
]);

const ActivityCard = ({ activity }) => {
  return (
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
  );
};

export default ActivityCard;
