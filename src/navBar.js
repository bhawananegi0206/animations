import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                <NavLink to="/" activestyle>
                       Home
                    </NavLink>
                    <NavLink to="/houseDetails" activestyle>
                        House Ideas
                    </NavLink>
                    <NavLink to="/roomDesign" activestyle>
                        Room design
                    </NavLink>
                    <NavLink to="/box" activestyle>
                        Box
                    </NavLink>
                    <NavLink to="/chair" activestyle>
                        Chair
                    </NavLink>
                    <NavLink to="/about" activestyle>
                        About
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;