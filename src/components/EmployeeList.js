import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPositions } from '../redux/employeeSlice';
import employeeService from '../services/employeeService';

const EmployeeList = () => {
  // const dispatch = useDispatch();
  // const positions = useSelector((state) => state.employee.positions);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await employeeService.fetchPositions();
  //     dispatch(setPositions(response.data));
  //   };

  //   fetchData();
  // }, [dispatch]);

  return (
    <div>
      {/* Render the employee positions hierarchically */}
    </div>
  );
};

export default EmployeeList;
