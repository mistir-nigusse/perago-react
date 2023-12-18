
import Home from "./pages/home";
import Edit from "./pages/edit";
import Detail from "./pages/detail";
// import Home from "./pages/home";


const routes = [
  {
    // type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    component: <Home/>,
  },
  {
    // type: "collapse",
    name: "Edit",
    key: "Edit",
    route: "/edit",
    component: <Edit/>,
  },  {
    // type: "",
    name: "Detail",
    key: "detail",
    route: "/detail",
    component: <Detail/>,
  },
];

export default routes;