import { BrowserRouter } from "react-router-dom";
import MaintenancePage from './maintenance/MaintenancePage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <MaintenancePage />
    </BrowserRouter>
  );
}

export default App;