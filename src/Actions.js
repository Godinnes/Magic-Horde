import React, { useState } from 'react';

const Actions = ({ onDraw, onPlay, onAttack, onDamage, onRestart, onDestroyAll }) => {
  const [damage, setDamage] = useState(0);

  return (
    <div style={{ "align-content": 'center' }}>
      <button title="Comprar Carta" onClick={onDraw}><span class="material-symbols-outlined">shopping_cart</span></button>
      <button title="Jogar Cartas" onClick={onPlay}><span class="material-symbols-outlined">play_arrow</span></button>
      <button title="Atacar" onClick={onAttack}><span class="material-symbols-outlined">local_fire_department</span></button>
      <button title="Reiniciar" onClick={onRestart}><span class="material-symbols-outlined">restart_alt</span></button>
      <button titel="Destruir Criaturas" onClick={onDestroyAll}><span class="material-symbols-outlined">delete</span></button>
      <input
        type="number"
        value={damage}
        onChange={(e) => setDamage(e.target.value)}
        placeholder="Dano"
      />
      <button title="Aplicar Dano" onClick={() => onDamage(damage)}><span class="material-symbols-outlined">heart_minus</span></button>
    </div>
  );
};

export default Actions;
