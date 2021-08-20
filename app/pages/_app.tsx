import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
} from "blitz";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { queryCache } from "react-query";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React from "react";
import Home from "./index";

//You can customize this as you want and even move it out to a separate file
const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={() => {
          // This ensures the Blitz useQuery hooks will automatically refetch
          // data any time you reset the error boundary
          queryCache.resetErrorBoundaries();
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof AuthenticationError) {
    return <Home />;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    );
  }
}
