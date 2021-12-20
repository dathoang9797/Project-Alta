import React from "react";
interface typeProps {
  navLink: string;
  onClick: () => void;
}
const NavLinkBottom: React.FC<typeProps> = ({ navLink, onClick }) => {
  return (
    <div className="nav-link__bottom">
      <a onClick={onClick}>{navLink}</a>
    </div>
  );
};

export default NavLinkBottom;
