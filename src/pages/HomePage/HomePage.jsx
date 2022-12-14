import './Homepage.css'

import { Container, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>

            < div className='background'>
                <h1 className='titleHomePage'><strong>Tu página de donaciones</strong></h1>
                <div className='divEmpieza'>
                    <Link to='/productos'>
                        <Button variant="light" className='empiezaBtn' size='lg'>Empieza a donar</Button>
                    </Link>
                </div>
            </div >
        </>
    )
}
export default HomePage