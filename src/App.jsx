import { Container } from 'react-bootstrap';
import './App.css'
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './routes/AppRoutes';
import UserMessage from './components/UserMessage/UserMessage';


const App = () => {

    return (

        <div className='App pb-5'>

            <Navigation />
            <AppRoutes />
            <UserMessage />
            <Footer />

        </div>
    );
}

export default App;
