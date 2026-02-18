import { Router, Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Game from "@/pages/Game";

function App() {
  // En production sur GitHub Pages, on a besoin du base path
  // import.meta.env.BASE_URL est défini par Vite selon l'environnement
  const base = import.meta.env.BASE_URL !== '/' ? import.meta.env.BASE_URL.replace(/\/$/, '') : undefined;
  
  return (
    <Router base={base}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/game/:id" component={Game} />
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </Router>
  );
}

export default App;
