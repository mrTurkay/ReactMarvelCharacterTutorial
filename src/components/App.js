import React, { Component } from 'react';
import SearchBar from './search-bar';
import CharacterList from './character-list';
import Details from './details';

import md5 from 'md5';
import $ from 'jquery';

const API_URL = 'https://gateway.marvel.com:443/v1/public/';
const publicKey = 'bad96750a8bcbcc02968526fed5c6f1d';
const privateKey = '3c8d349aa883d4233a20530b8dbb15fc0e0543e0';
const ts = '1';
const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5(`${ts}${privateKey}${publicKey}`)}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: null,
      selectedCharacter: null,
    };

    this.CharacterSearch = this.CharacterSearch.bind(this);
  }

  componentDidMount = () => {
    this.GetInitialChararcters();
  };

  GetInitialChararcters() {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5`, result => {
      const characters = result.data.results;
      this.setState({ characters });
    });
  }

  CharacterSearch(term) {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5&nameStartsWith=${term}`, result => {
      const characters = result.data.results;
      this.setState({ characters });
    });
  }

  handleCharacterSelect = character => {
    this.setState({ selectedCharacter: character });
  };

  render() {
    if (!this.state.characters) return <h1>Loading...</h1>;
    return (
      <div className="container">
        <SearchBar onSearchButtonClick={this.CharacterSearch} />
        <CharacterList
          characters={this.state.characters}
          onCharacterSelect={this.handleCharacterSelect}
        />
        <Details character={this.state.selectedCharacter || this.state.characters[0]} />
      </div>
    );
  }
}

export default App;
