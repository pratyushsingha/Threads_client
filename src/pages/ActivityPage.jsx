import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const ActivityPage = () => {
  return (
    <section className="p-4">
      <div className="flex space-x-2">
        <Avatar>
          <AvatarImage src="/image.png" />
          <AvatarFallback>Anonymous</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">zenifer.laurance</p>
          <p className="text-sm text-slate-500 mb-5"> liked your tweet hshskkdkd</p>
        </div>
      </div>
      <hr />
    </section>
  );
};

export default ActivityPage;
