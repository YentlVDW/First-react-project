import React  from 'react';
import './Header.css';

function Header({setVisibility, loggedIn, users, setNewVisible}) {

  return (
    <div className="navigation">
        <ul>
          {loggedIn === true ? <li id="linkStyle" onClick={() => {setNewVisible(true)}}>+ New Character</li> : null}
          {loggedIn === true ? <li id="loggedUser">Hi, {users[0].username}</li> : null}
        </ul>
    </div>
  );
}

export default Header;