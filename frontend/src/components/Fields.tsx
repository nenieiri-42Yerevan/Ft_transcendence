import React from 'react';
import avatar from '@SRC_DIR/assets/images/avatar.png';

const friendsfields = () => {
  return (
    <div className="flex flex-row m-1 items-center justify-between">
      <img src={avatar} className="w-[3em] h-fit"></img>
      <span>arastepa</span>
    </div>
  );
};

export default friendsfields;
