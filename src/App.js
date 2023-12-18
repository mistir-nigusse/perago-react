import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import routes from "./routes";
import positionsApi from './services/employeeService'


function App() {

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const positions = await positionsApi.getAllPositions();
  //       // Do something with the fetched positions data
  //       console.log('Fetched positions:', positions);
  //     } catch (error) {
  //       // Handle errors
  //       console.error('Error fetching positions:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); 
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
    const form = useForm({
      initialValues: {
        name: "",
        email: "",
      },
    });
  
  return (
    <MantineProvider>
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

    </MantineProvider>
  );
}

export default App;

