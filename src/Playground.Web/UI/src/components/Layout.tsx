import React from 'react'
import Container from 'react-bootstrap'

const Layout = (props) => {
    return (
        <div>
            <p>
                Testeroni
            </p>
            {props.children}
        </div>
        )
}

export default Layout;