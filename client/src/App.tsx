import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import useMovieStore from "./store/MovieStore";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const getMovies = useMovieStore((state) => state.getMovies);
  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      getMovies();
      didRun.current = true;
    }
  }, [getMovies]);

  return (
    <Routes>
      <Route>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
