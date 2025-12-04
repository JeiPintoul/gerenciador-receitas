import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Rotas } from "./routes";

export default function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>

      <Rotas />

    </QueryClientProvider>
  );
}
