import React from 'react';
import PokemonList from './components/PokemonList';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #e50000 0%, #ffffff 100%);
  }
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <PokemonList />
    </AppContainer>
  );
};

export default App;
