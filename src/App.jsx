import RouteService from "./routes/RouteService";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RouteService />
    </BrowserRouter>
  );
}

export default App;
