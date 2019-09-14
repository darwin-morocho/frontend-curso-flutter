import React from 'react';

const NavBtn = ({ icon, classes, onClick }) => (
  <div className="nav-btn" onClick={onClick}>
    <i className={`material-icons ${classes}`}>{icon}</i>
  </div>
);

export default NavBtn;
