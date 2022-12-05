import './App.css'
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './routes/AppRoutes';


const App = () => {

    return (
        <div className='App pb-5'>

            <Navigation />

            <div className='container'>
                <AppRoutes />
            </div>

            <Footer />
        </div>
    );
}
export default App;
