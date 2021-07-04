import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Projects from './components/projects/Projects';

function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/projects" component={Projects} />
            </Switch>
        </Layout>
    );
}

export default App;
