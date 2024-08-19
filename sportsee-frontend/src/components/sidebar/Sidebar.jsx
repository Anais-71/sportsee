import './sidebar.css'

//icons
import yoga from '../../assets/icons/yoga-icon.png'
import swim from '../../assets/icons/swimming-icon.png'
import bike from '../../assets/icons/bike-icon.png'
import weight from '../../assets/icons/weight-icon.png'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__icons">
        <img className="sidebar__icons--icon" src={yoga} alt="Icône de yoga" />
        <img
          className="sidebar__icons--icon"
          src={swim}
          alt="Icône de natation"
        />
        <img
          className="sidebar__icons--icon"
          src={bike}
          alt="Icône de cyclisme"
        />
        <img
          className="sidebar__icons--icon"
          src={weight}
          alt="Icône de musculation"
        />
      </div>
      <div className="sidebar__copyrights">Copyright, SportSee 2020</div>
    </div>
  )
}

export default Sidebar
