import React, { useEffect } from "react";
import PostionTree from "../components/postionTree";
import Tasktree from "../components/tasklist";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositions } from "../redux/actions/positionSlice";
import { Tree, TreeNode } from 'react-organizational-chart';

const Home = () => {
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.data);
  // useEffect(() => {
  //   dispatch(fetchPositions());
  // }, []);
  // console.log(data);

  return (
    <div className="w-full">
      <PostionTree />
      {/* <Tasktree /> */}
      {/* <EmployeeList />
      <EmployeeForm /> */}
    </div>
  );
};

export default Home;
