import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { router } from './routes/routes';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
