import { ChakraProvider } from '@chakra-ui/react';
//import { theme } from './styles/theme';
import { Home } from './pages/Home';
import { ParametersProvider } from './service/contexts/ParametersContext';
import { ThemeProvider } from './service/contexts/ThemeContext';
import { themeDark } from './styles/theme';


function App() {

  return (
    <ThemeProvider>
      <ChakraProvider resetCSS theme={themeDark}>
        <ParametersProvider>
          <Home />
        </ParametersProvider>
      </ChakraProvider >
    </ThemeProvider>
  );
}

export default App;
