import React from 'react';
import { Container } from 'react-bootstrap';

const Layout = (props: any) => {
    return (
        <div>
            <p>
                Testeroni
            </p>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

export default Layout;