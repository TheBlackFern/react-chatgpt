import * as React from "react";
import GPTContainer from "@/components/gpt-container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";
import { LanguageToggle } from "./components/theme/language-toggle";
import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <React.Suspense
      fallback={
        <>
          <p className="font-bold text-center text-xl mt-10">Loading...</p>
          <p className="text-center text-base mt-10">
            You can get your OpenAI API Key handy while you wait
          </p>
        </>
      }
    >
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <div className="absolute z-20 flex flex-row gap-2 top-3 right-3 md:right-8">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <LazyMotion features={domAnimation}>
            <GPTContainer />
          </LazyMotion>
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </React.Suspense>
  );
}

export default App;
