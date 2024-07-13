import React from 'react';

const Deck = ({ deck }) => {
  return (
    <div style={{ "align-content": 'center' }}>
      <span class="material-symbols-outlined">heart_check</span> ({deck.length} cartas)
    </div>
  );
};

export default Deck;
