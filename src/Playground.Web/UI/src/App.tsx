import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import Projects from './components/projects/Projects';
import JsonProject from './components/projects/json_project/JsonProject'
import TikTakToeProject from './components/projects/tiktaktoe_project/TikTakToeProject'

function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/projects/json_project" component={JsonProject} />
                <Route exact path="/projects/tiktaktoe_project" component={TikTakToeProject} />
            </Switch>
        </Layout>
    );
}

export default App;
