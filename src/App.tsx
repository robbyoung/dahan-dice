import './App.scss';
import { Spirit } from './models/spirit';
import { HiPencil } from 'react-icons/hi';
import SpiritDeck from './components/spirit-deck/spirit-deck';
import Header from './components/header/header';
import IconButton from './components/icon-button/icon-button';
import { useState } from 'react';
import SpiritCardFilterOverlay from './components/spirit-card-filter-overlay/spirit-card-filter-overlay';
import BoardDealer from './components/board-dealer/board-dealer';
import { getRemainingBoards } from './models/board';

function App() {
  const availableSpirits = Object.values(Spirit);
  const availableBoards = getRemainingBoards([], true);

  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [selectedSpirits, setSelectedSpirits] = useState(availableSpirits);
  const [allowEdits, setAllowEdits] = useState(true);

  return (
    <div className="app">
      <Header />
      <div className="body">
        <SpiritDeck
          spirits={selectedSpirits}
          selectCount={1}
          onShuffle={() => setAllowEdits(false)}
        />
        {allowEdits && (
          <IconButton
            icon={<HiPencil />}
            tooltip="Edit Deck Contents"
            onClick={() => allowEdits && setShowFilterOverlay(true)}
          ></IconButton>
        )}
        <BoardDealer
          availableBoards={availableBoards}
          animate={!allowEdits}
          onDealt={() => undefined}
        />
      </div>
      {showFilterOverlay && (
        <SpiritCardFilterOverlay
          availableSpirits={availableSpirits}
          selectedSpirits={selectedSpirits}
          onDismiss={() => setShowFilterOverlay(false)}
          onSelectionChange={setSelectedSpirits}
        />
      )}
    </div>
  );
}

export default App;
