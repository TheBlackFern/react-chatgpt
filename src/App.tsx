import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GPTContainer from "@/components/gpt-container";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="absolute top-3 right-3 md:right-8">
          <ThemeToggle />
        </div>
        <GPTContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
