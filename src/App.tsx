import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GPTContainer from "@/components/gpt-container";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GPTContainer />
    </QueryClientProvider>
  );
}

export default App;
