import React from 'react';

const Hand = ({ hand, moveToField, moveToGraveyard }) => {
  return (
    <div style={{ width: '100%', 'box-shadow': '0px 2px 6px 1px', overflowY: 'auto' }}>
      <h2>Mão</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {hand.map((card, index) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div key={index} style={{ margin: '0 10px', position: 'relative' }}>
              <img
                src={card.image}
                alt={card.name}
                style={{ width: '100px', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.9)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{ display: 'flex', flexDirection: 'row', margin: '0px' }}>
                <button title="Colocar em Jogo" onClick={() => moveToField(card)}><span class="material-symbols-outlined">arrow_downward</span></button>
                <button title="Colocar no Cemitério" onClick={() => moveToGraveyard(card)}><span class="material-symbols-outlined">keyboard_double_arrow_down</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hand;