import logo from '../../assets/logo.svg'
import './header.css'

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="SportSee" className="header__logo" />
      <div className="header__nav">
        <div className="header__nav--el">Accueil</div>
        <div className="header__nav--el">Profil</div>
        <div className="header__nav--el">Réglages</div>
        <div className="header__nav--el">Communauté</div>
      </div>
    </div>
  )
}

export default Header
