import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchColorPage from './search-color-page';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<SearchColorPage/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
