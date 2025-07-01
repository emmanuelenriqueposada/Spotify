import { Outlet } from "react-router-dom";
import { ItemProvider } from "./context/context";

function App() {
  return (
    <>
      <ItemProvider>
        <Outlet />
      </ItemProvider>
    </>
  );
}

export default App;
