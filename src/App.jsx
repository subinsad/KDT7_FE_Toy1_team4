import "./scss/style.scss";
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./routes/PageRouter";
import { useState } from "react";
import Loading from "./components/Common/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return <>{isLoading ? <Loading /> : <RouterProvider router={router} />}</>;
}

export default App;
