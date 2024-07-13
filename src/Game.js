import React, { useState, useEffect } from 'react';
import Deck from './Deck';
import Hand from './Hand';
import Field from './Field';
import Graveyard from './Graveyard';
import Exiled from './Exiled';
import Actions from './Actions';

const initialDeck = [
  { name: "Call to the Grave", image: "https://cards.scryfall.io/large/front/5/e/5e1324b6-dba0-4aff-a403-a45d2b405f5b.jpg?1562644226" },
  { name: "Bad Moon", image: "https://cards.scryfall.io/large/front/8/f/8f8a75da-ea3c-43e7-9d32-1c92f8ec0fd2.jpg?1562928849" },
  { name: "Bad Moon", image: "https://cards.scryfall.io/large/front/8/f/8f8a75da-ea3c-43e7-9d32-1c92f8ec0fd2.jpg?1562928849" },
  { name: "Plague Wind", image: "https://cards.scryfall.io/large/front/7/2/72d21d0d-7de7-4f03-8663-002c9290512f.jpg?1562436663" },
  { name: "Damnation", image: "https://cards.scryfall.io/large/front/d/3/d3c0aac5-b9f1-4446-bfea-3e1dd1cf1f2f.jpg?1673147492" },
  { name: "Yixlid Jailer", image: "https://cards.scryfall.io/large/front/3/f/3f2ef91f-d113-4e8d-a164-c6e261aa9c12.jpg?1619396601" },
  { name: "Forsaken Wastes", image: "https://cards.scryfall.io/large/front/c/9/c9dbfc7c-164d-47b8-8f05-987864fca89b.jpg?1562721899" },
  { name: "Nested Ghoul", image: "https://cards.scryfall.io/large/front/c/0/c035ff58-9df3-4db4-b9d0-97d58080ecfe.jpg?1562614451" },
  { name: "Nested Ghoul", image: "https://cards.scryfall.io/large/front/c/0/c035ff58-9df3-4db4-b9d0-97d58080ecfe.jpg?1562614451" },
  { name: "Infectious Horror", image: "https://cards.scryfall.io/large/front/d/1/d17aaa92-10ca-4f70-b45e-5a51e9192efb.jpg?1562304369" },
  { name: "Infectious Horror", image: "https://cards.scryfall.io/large/front/d/1/d17aaa92-10ca-4f70-b45e-5a51e9192efb.jpg?1562304369" },
  { name: "Delirium Skeins", image: "https://cards.scryfall.io/large/front/6/4/64b0d9e7-4a0f-4f07-99ae-31c3c9f0037a.jpg?1593813247" },
  { name: "Delirium Skeins", image: "https://cards.scryfall.io/large/front/6/4/64b0d9e7-4a0f-4f07-99ae-31c3c9f0037a.jpg?1593813247" },
  { name: "Blind Creeper", image: "https://cards.scryfall.io/large/front/8/6/86d5440a-7460-4b4f-a167-a6c4fb2d855e.jpg?1562878236" },
  { name: "Soulless One", image: "https://cards.scryfall.io/large/front/4/1/410a214b-09c4-49bd-a461-3330d0249ae5.jpg?1562841695" },
  { name: "Soulless One", image: "https://cards.scryfall.io/large/front/4/1/410a214b-09c4-49bd-a461-3330d0249ae5.jpg?1562841695" },
  { name: "Vengeful Dead", image: "https://cards.scryfall.io/large/front/7/c/7c11c11d-9809-4031-8cbc-21aef07d7f1f.jpg?1562531178" },
  { name: "Vengeful Dead", image: "https://cards.scryfall.io/large/front/7/c/7c11c11d-9809-4031-8cbc-21aef07d7f1f.jpg?1562531178" },
  { name: "Fleshbag Marauder", image: "https://cards.scryfall.io/large/front/f/c/fce2baa4-2976-4bbd-b6c5-a5a3c6a901be.jpg?1706239873" },
  { name: "Carrion Wurm", image: "https://cards.scryfall.io/large/front/3/7/37c2b228-94c0-4e84-ad6d-80b170bb6c0c.jpg?1562629238" },
  { name: "Maggot Carrier", image: "https://cards.scryfall.io/large/front/c/d/cd2ee72e-68d3-46b9-abc6-08532ce412b2.jpg?1562936226" },
  { name: "Maggot Carrier", image: "https://cards.scryfall.io/large/front/c/d/cd2ee72e-68d3-46b9-abc6-08532ce412b2.jpg?1562936226" },
  { name: "Maggot Carrier", image: "https://cards.scryfall.io/large/front/c/d/cd2ee72e-68d3-46b9-abc6-08532ce412b2.jpg?1562936226" },
  { name: "Cackling Fiend", image: "https://cards.scryfall.io/large/front/c/7/c7e4fa7f-a5d7-46cd-bc46-d3d231235460.jpg?1675199534" },
  { name: "Cackling Fiend", image: "https://cards.scryfall.io/large/front/c/7/c7e4fa7f-a5d7-46cd-bc46-d3d231235460.jpg?1675199534" },
  { name: "Cackling Fiend", image: "https://cards.scryfall.io/large/front/c/7/c7e4fa7f-a5d7-46cd-bc46-d3d231235460.jpg?1675199534" },
  { name: "Cackling Fiend", image: "https://cards.scryfall.io/large/front/c/7/c7e4fa7f-a5d7-46cd-bc46-d3d231235460.jpg?1675199534" },
  { name: "Death Baron", image: "https://cards.scryfall.io/large/front/1/1/11641a17-e979-4edb-adba-789f21fd017d.jpg?1637630011" },
  { name: "Grave Titan", image: "https://cards.scryfall.io/large/front/1/3/13680953-cf05-4e38-a3cf-22900c02fab7.jpg?1706240764" },
  { name: "Severed Legion", image: "https://cards.scryfall.io/large/front/8/2/82633f38-5af1-429e-8c9d-db536af85309.jpg?1562550727" },
  { name: "Severed Legion", image: "https://cards.scryfall.io/large/front/8/2/82633f38-5af1-429e-8c9d-db536af85309.jpg?1562550727" },
  { name: "Skulking Knight", image: "https://cards.scryfall.io/large/front/a/7/a7f7927b-64ae-4448-9540-8d7bbe88c9cc.jpg?1562930394" },
  { name: "Undead Warchief", image: "https://cards.scryfall.io/large/front/0/1/01482b0c-d05b-4356-9144-e044159f4dcb.jpg?1562841195" },
  { name: "Twilights Call", image: "https://cards.scryfall.io/large/front/a/6/a6e04dd2-75ad-4427-93cc-37226340c2fb.jpg?1592713829" },
  { name: "Army of the Damned", image: "https://cards.scryfall.io/large/front/b/f/bf818314-1eb4-48da-8e6f-ff7b89873b63.jpg?1673484100" },
  { name: "Endless Ranks of the Dead", image: "https://cards.scryfall.io/large/front/1/5/155ae16c-f32b-421d-a92a-bf13d9f32891.jpg?1637630179" },
  { name: "Rotting Fensnake", image: "https://cards.scryfall.io/large/front/c/2/c21cbb10-9157-4887-a752-29b9e94fc77a.jpg?1562836560" },
  { name: "Rotting Fensnake", image: "https://cards.scryfall.io/large/front/c/2/c21cbb10-9157-4887-a752-29b9e94fc77a.jpg?1562836560" },
  { name: "Unbreathing Horde", image: "https://cards.scryfall.io/large/front/d/d/dd119aa8-8414-4942-9a28-3e68a9a52a8e.jpg?1592763342" },
  { name: "Walking Corpse", image: "https://cards.scryfall.io/large/front/0/5/053b59b4-a22c-4228-aadc-ae9da6bb465e.jpg?1594736452" },
  { name: "Zombie Giant Token", image: "https://cards.scryfall.io/large/front/b/e/be7e26e1-5db6-49ba-a88e-c79d889cd364.jpg?1561757964" },
  { name: "Zombie Giant Token", image: "https://cards.scryfall.io/large/front/b/e/be7e26e1-5db6-49ba-a88e-c79d889cd364.jpg?1561757964" },
  { name: "Zombie Giant Token", image: "https://cards.scryfall.io/large/front/b/e/be7e26e1-5db6-49ba-a88e-c79d889cd364.jpg?1561757964" },
  { name: "Zombie Giant Token", image: "https://cards.scryfall.io/large/front/b/e/be7e26e1-5db6-49ba-a88e-c79d889cd364.jpg?1561757964" },
  { name: "Zombie Giant Token", image: "https://cards.scryfall.io/large/front/b/e/be7e26e1-5db6-49ba-a88e-c79d889cd364.jpg?1561757964" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" },
  { name: "Zombie Token", image: "https://cards.scryfall.io/large/front/9/0/909387e1-dc33-446c-825f-07c915ad73ee.jpg?1717191020" }
];

const shuffleDeck = (deck) => {
  let shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

const Game = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [field, setField] = useState([]);
  const [graveyard, setGraveyard] = useState([]);
  const [exiled, setExiled] = useState([]);
  const [attackMode, setAttackMode] = useState(false);

  useEffect(() => {
    setDeck(shuffleDeck(initialDeck));
  }, []);

  const drawCard = () => {
    let newDeck = [...deck];
    let newHand = [...hand];

    while (newDeck.length > 0) {
      const card = newDeck.shift();
      newHand.push(card);
      if (!card.name.includes("Token")) {
        break;
      }
    }

    setDeck(newDeck);
    setHand(newHand);
    setAttackMode(false);
  };

  const playCards = () => {
    setField([...field, ...hand]);
    setHand([]);
  };

  const attack = () => {
    setAttackMode(true);
  };

  const applyDamage = (damage) => {
    let newDeck = [...deck];
    const newGraveyard = [...graveyard];

    for (let i = 0; i < damage; i++) {
      if (newDeck.length > 0) {
        newGraveyard.push(newDeck.shift());
      }
    }

    setDeck(newDeck);
    setGraveyard(newGraveyard);
  };

  const restartGame = () => {
    setDeck(shuffleDeck(initialDeck));
    setHand([]);
    setField([]);
    setGraveyard([]);
    setExiled([]);
    setAttackMode(false);
  };

  const moveToField = (card) => {
    setHand(hand.filter(c => c !== card));
    setGraveyard(graveyard.filter(c => c !== card));
    setField([...field, card]);
  };

  const moveToGraveyard = (card) => {
    setHand(hand.filter(c => c !== card));
    setField(field.filter(c => c !== card));
    if (!card.name.includes("Token"))
      setGraveyard([...graveyard, card]);
  };

  const moveToHand = (card) => {
    setGraveyard(graveyard.filter(c => c !== card));
    setField(field.filter(c => c !== card));
    if (!card.name.includes("Token"))
      setHand([...hand, card]);
  };

  const destroyAllCreatures = () => {
    setGraveyard([...graveyard, ...field.filter(c => !c.name.includes("Token"))]);
    setField([]);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
        <Actions
          onDraw={drawCard}
          onPlay={playCards}
          onAttack={attack}
          onDamage={applyDamage}
          onRestart={restartGame}
          onDestroyAll={destroyAllCreatures}
        />
        <Deck deck={deck} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <Hand hand={hand} moveToField={moveToField} moveToGraveyard={moveToGraveyard} />
        <Field field={field} moveToGraveyard={moveToGraveyard} moveToHand={moveToHand} />
        <Graveyard graveyard={graveyard} moveToHand={moveToHand} moveToField={moveToField} />
        <Exiled exiled={exiled} />
      </div>
    </div>
  );
};

export default Game;