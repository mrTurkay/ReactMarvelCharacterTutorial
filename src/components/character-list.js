import React from 'react';

import CharacterListItem from './character-list-item';

const CharacterList = props => {
	const { characters, onCharacterSelect } = props;

	return (
		<div className="col-md-4">
			{characters.map(character => (
				<CharacterListItem
					key={character.id}
					character={character}
					onCharacterSelect={onCharacterSelect}
				/>
			))}
		</div>
	);
};

export default CharacterList;
