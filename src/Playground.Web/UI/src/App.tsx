import {
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import Projects from './components/projects/Projects';
import JsonProject from './components/projects/json_project/JsonProject';
import TikTakToeProject from './components/projects/tiktaktoe_project/TikTakToeProject';
import TypingProject from './components/projects/typing_project/TypingProject';
import DigitProject from './components/projects/digit_project/DigitProject';
import TetrisProject from './components/projects/tetris_project/TetrisProject';
import PhotoGallery from './components/projects/photo_project/PhotoGallery';
import Snake from './components/projects/snake_project/Snake';
import GameOfLife from './components/projects/game_of_life_project/GameOfLife';

function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/projects/editor_project" component={JsonProject} />
                <Route exact path="/projects/tiktaktoe_project" component={TikTakToeProject} />
                <Route exact path="/projects/typing_project" component={TypingProject} />
                <Route exact path="/projects/digit_project" component={DigitProject} />
                <Route exact path="/projects/tetris_project" component={TetrisProject} />
                <Route exact path="/projects/photo_project" component={PhotoGallery} />
                <Route exact path="/projects/snake_project" component={Snake} />
                <Route exact path="/projects/game_of_life_project" component={GameOfLife} />
            </Switch>
        </Layout>
    );
}

export default App;
