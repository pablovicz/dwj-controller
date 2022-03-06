import { ChakraProvider } from '@chakra-ui/react';
import { useContext } from 'react';
//import { theme } from './styles/theme';
import { Home } from './pages/Home';
import { ParametersProvider } from './service/contexts/ParametersContext';
import { ThemeContext, ThemeProvider } from './service/contexts/ThemeContext';
import { themeDark, themeLight } from './styles/theme';


function App() {

  const { theme } = useContext(ThemeContext);

  return (
      <ChakraProvider resetCSS theme={theme}>
        <ParametersProvider>
          <Home />
        </ParametersProvider>
      </ChakraProvider >
  );
}

export default App;
