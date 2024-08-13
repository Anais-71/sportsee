import logo from '../../assets/logo.svg'
import './header.css'

function Header() {
    return (
        <div className='header'>
            <img src={logo} alt='SportSee' className='logo' />
            <div className='nav'>
                <ul>
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglages</li>
                    <li>Communauté</li>
                </ul>
            </div>
        </div>
    )
}
 
export default Header