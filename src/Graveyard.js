import React from 'react';

const Graveyard = ({ graveyard, moveToHand, moveToField }) => {
  return (
    <div style={{ width: '100%', 'box-shadow': '0px 2px 6px 1px', overflowY: 'auto' }}>
      <h2>Cemitério</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {graveyard.map((card, index) => (
          <div key={index} style={{ margin: '0 10px', position: 'relative' }}>
            <img
              src={card.image}
              alt={card.name}
              style={{ width: '100px', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.9)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ display: 'flex', flexDirection: 'row', margin: '0px' }}>
              <button title="Colocar no Mão" onClick={() => moveToHand(card)} style={{ display: 'block', marginTop: '5px' }}><span class="material-symbols-outlined">keyboard_double_arrow_up</span></button>
              <button title="Colocar em Jogo" onClick={() => moveToField(card)}><span class="material-symbols-outlined">arrow_downward</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graveyard;
