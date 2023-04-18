import { useEffect, useState } from 'react';

function useArrowKeys() {
  const [arrowKeysState, setArrowKeysState] = useState({ ArrowUp: 0, ArrowDown: 0});

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      setArrowKeysState(prevState => {
        if (event.code === 'ArrowUp') {
          return { ...prevState, ArrowUp: 1 };
        } else if (event.code === 'ArrowDown') {
          return { ...prevState, ArrowDown: 1 };
        }
        return prevState;
      });
    }

    function handleKeyUp(event: KeyboardEvent) {
      setArrowKeysState(prevState => {
        if (event.code === 'ArrowUp') {
          return { ...prevState, ArrowUp: 0 };
        } else if (event.code === 'ArrowDown') {
          return { ...prevState, ArrowDown: 0 };
        }
        return prevState;
      });
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return arrowKeysState;
}

export default useArrowKeys;
