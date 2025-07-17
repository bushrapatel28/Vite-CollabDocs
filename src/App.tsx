import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import { ThemeProvider } from "./components/ThemeProvider";
import routes from "tempo-routes";

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {import.meta.env.VITE_TEMPO === "true" ? (
          useRoutes(routes)
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
