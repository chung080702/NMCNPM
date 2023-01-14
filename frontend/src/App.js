import { useRoutes } from "react-router-dom";
import publicRoutes from "./routes";
import DefaultLayout from "./components/defaultLayout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (<div className="App">

    <DefaultLayout>
      {
        useRoutes(publicRoutes)
      }
    </DefaultLayout>




  </div>);
}

export default App;