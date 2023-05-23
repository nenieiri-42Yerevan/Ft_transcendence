import { useState, useEffect } from 'react';

export function useKeyPress() {
  const [keysPressed, setKeyPressed] = useState({});

  function downHandler({ key }) {
    setKeyPressed(prevState => ({
      ...prevState,
      [key]: true,
    }));
  }

  function upHandler({ key }) {
    setKeyPressed(prevState => ({
      ...prevState,
      [key]: false,
    }));
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keysPressed;
}
export default useKeyPress;
