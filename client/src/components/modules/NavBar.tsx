import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
	return (
		<nav className="NavBar-container">
			<div className="NavBar-title u-inlineBlock">Imagine Having Friends</div>
			<div className="NavBar-linkContainer u-inlineBlock">
				<Link to="/" className="NavBar-link">
					Home
				</Link>
				<Link to="/profile/" className="NavBar-link">
					Profile
				</Link>
				<Link to="/garden/" className="NavBar-link">
					Garden
				</Link>
				<Link to="/shop/" className="NavBar-link">
					Shop
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
