import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../nav/Navbar';

const Layout = (props: any) => {
    return (
        <div>
            <Navbar/>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

export default Layout;