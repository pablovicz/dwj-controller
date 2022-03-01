import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { Home } from './pages/Home';
import { ParametersProvider } from './service/contexts/ParametersContext';


function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ParametersProvider>
        <Home />
      </ParametersProvider>
    </ChakraProvider >
  );
}

export default App;
