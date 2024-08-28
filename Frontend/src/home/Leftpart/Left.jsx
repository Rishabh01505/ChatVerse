import React from 'react';
import Search from './Search';
import Users from './Users';
import Logout from './Logout';

/*
left part divided into 3 sections - logout, users, search.
import their jsx files in left (green command)
*/
function Left() {
  return (
    <div className="w-full bg-black text-gray-300">
      <Search/>
      <div className='overflow-y-auto no-scrollbar'
        style={{ minHeight: "calc(4vh - 10vh)" }}>
      <Users/>
      </div>
      <Logout/>
    </div>
  );
}

export default Left;
