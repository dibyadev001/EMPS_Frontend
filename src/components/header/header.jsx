import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar fixed="top" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Employee Management System</Navbar.Brand>
        </Navbar>
    );
};

export default Header;
