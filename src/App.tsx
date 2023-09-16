import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GPTContainer from "@/components/gpt-container";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";
import { LanguageToggle } from "./components/theme/language-toggle";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <React.Suspense
          fallback={
            <p className="font-bold text-center text-xl mt-10">Loading...</p>
          }
        >
          <div className="absolute flex flex-row gap-2 top-3 right-3 md:right-8">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <GPTContainer />
        </React.Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
