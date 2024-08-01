import { setPage } from "@/features/tweetSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const usePagination = () => {
  const dispatch = useDispatch();

  const incrementPage = () => {
    dispatch(setPage());
  };
  return { incrementPage };
};

export default usePagination;
