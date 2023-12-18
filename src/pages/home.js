import React from 'react';
import PostionTree from '../components/postionTree';
import Tasktree from '../components/tasklist'
const Home = () => {


  return (
    <div className='card w-4'>
      <h1 className="text-3xl font-bold stroke-yellow-900 underline">hello</h1>
     {/* <PostionTree/> */}
     <Tasktree/>
      {/* <EmployeeList />
      <EmployeeForm /> */}
    </div>
  );
};

export default Home;
