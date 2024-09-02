import './sidebar.css'

// Importation du composant Icon
import Icon from '../icon/Icon'

// Importation des icônes
import yoga from '../../assets/icons/yoga-icon.png'
import swim from '../../assets/icons/swimming-icon.png'
import bike from '../../assets/icons/bike-icon.png'
import weight from '../../assets/icons/weight-icon.png'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__icons">
        <Icon imageSrc={yoga} title="Icône de yoga" />
        <Icon imageSrc={swim} title="Icône de natation" />
        <Icon imageSrc={bike} title="Icône de cyclisme" />
        <Icon imageSrc={weight} title="Icône de musculation" />
      </div>
      <div className="sidebar__copyrights">Copyright, SportSee 2020</div>
    </div>
  )
}

export default Sidebar
