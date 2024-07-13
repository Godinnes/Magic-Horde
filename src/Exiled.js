import React from 'react';

const Exiled = ({ exiled }) => {
  return (
    <div style={{ width: '100%', 'box-shadow': '0px 2px 6px 1px', overflowY: 'auto' }}>
      <h2>Exílio</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {exiled.map((card, index) => (
          <div key={index} style={{ margin: '0 10px' }}>
            <img
              src={card.image}
              alt={card.name}
              style={{ width: '100px', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.9)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            {card.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exiled;
