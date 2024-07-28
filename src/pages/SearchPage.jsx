import { Button, Input } from "@/components/Index";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useRef } from "react";

const SearchPage = () => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <section className="p-4">
      <Input ref={searchInputRef} className="my-2" placeholder="Search" />
      <div className="flex justify-between my-3">
        <div className="flex space-x-2">
          <Avatar>
            <AvatarImage src="/image.png" />
            <AvatarFallback>Anonymous</AvatarFallback>
          </Avatar>
          <div>
            <p>Threads</p>
            <p className="text-sm text-slate-500 mb-2">@threads</p>
            <p>3.03M followers</p>
          </div>
        </div>
        <Button variant="outline" className="self-center">
          Follow
        </Button>
      </div>
      <hr />
    </section>
  );
};

export default SearchPage;
