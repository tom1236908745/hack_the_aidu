// components
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
// css
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const queryClient: QueryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
