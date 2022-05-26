import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <nav>
        <h2>Cooking Recipe</h2>
        <div className="links">
          <ul>
            <li>
                <Link to={'/new-recipe'}>+ New Recipe</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
