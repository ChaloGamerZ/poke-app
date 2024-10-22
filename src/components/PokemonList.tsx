import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select, { SingleValue } from 'react-select';
import apiClient from '../api';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonOption {
  value: string;
  label: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  description: string;
}

interface EvolutionDetail {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionDetail[];
}

const Container = styled.div`
  text-align: center;
  background: #e6d596; // Pale Yellow
  border: 5px solid #cc322a; // Bright Red
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h1`
  color: #cc322a; // Bright Red
`;

const PokemonDetailContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background: #b45c64; // Muted Pink
  border-radius: 10px;
  color: white;
`;

const PokemonImage = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  border: 3px solid white;
  border-radius: 10px;
`;

const EvolutionList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const EvolutionItem = styled.li`
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
`;

const EvolutionImage = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid white;
  border-radius: 10px;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
  .react-select__control {
    border: 2px solid #cc322a; // Bright Red
  }
`;

const PokemonList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<PokemonOption[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() !== '') {
        const response = await apiClient.get(`/pokemon?limit=1000`);
        setSuggestions(response.data.results
          .filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((pokemon: Pokemon) => ({
            value: pokemon.name,
            label: pokemon.name
          }))
        );
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [searchTerm]);

  const handleSearch = async (name: string) => {
    const pokemonResponse = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
    const speciesResponse = await apiClient.get(pokemonResponse.data.species.url);
    const evolutionResponse = await apiClient.get(speciesResponse.data.evolution_chain.url);

    const description = speciesResponse.data.flavor_text_entries.find(
        (      entry: { language: { name: string; }; }) => entry.language.name === 'es'
    );

    setSelectedPokemon({
      ...pokemonResponse.data,
      description: description ? description.flavor_text : 'No description available.'
    });

    const evolutionNames: PokemonDetail[] = [];
    const extractEvolutionNames = async (chain: EvolutionDetail) => {
      const pokemonData = await apiClient.get(`/pokemon/${chain.species.name}`);
      evolutionNames.push({
        id: pokemonData.data.id,
        name: chain.species.name,
        sprites: pokemonData.data.sprites,
        flavor_text_entries: [],
        description: ''
      });
      if (chain.evolves_to.length > 0) {
        for (const evolution of chain.evolves_to) {
          await extractEvolutionNames(evolution);
        }
      }
    };
    await extractEvolutionNames(evolutionResponse.data.chain);

    setEvolutionChain(evolutionNames);
  };

  return (
    <Container>
      <Title>Busca un Pokémon</Title>
      <CustomSelect
        options={suggestions}
        onInputChange={(inputValue) => setSearchTerm(inputValue)}
        onChange={(newValue) => {
          const selectedOption = newValue as SingleValue<PokemonOption>;
          if (selectedOption && selectedOption.value) {
            handleSearch(selectedOption.value);
          }
        }}
        placeholder="Ingresa aqui el nombre del Pokémon"
        isClearable
      />
      {selectedPokemon && (
        <PokemonDetailContainer>
          <h2>{selectedPokemon.name}</h2>
          <PokemonImage src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <p>{selectedPokemon.description}</p>
          <h3>Evolutions:</h3>
          <EvolutionList>
            {evolutionChain.map(evolution => (
              <EvolutionItem
                key={evolution.id}
                onClick={() => handleSearch(evolution.name)}
              >
                <EvolutionImage src={evolution.sprites.front_default} alt={evolution.name} />
                <p>{evolution.name}</p>
              </EvolutionItem>
            ))}
          </EvolutionList>
        </PokemonDetailContainer>
      )}
    </Container>
  );
};

export default PokemonList;
