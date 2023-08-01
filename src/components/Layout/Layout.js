import { useSelector } from "react-redux";
import Header from "./Header";
import "./Layout.css";

function Layout(props) {
  const state = useSelector((state) => state);
  return (
    <div className="app">
      <Header state={state}/>
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
