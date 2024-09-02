import './icon.css'

function Icon({ imageSrc, title }) {
  return (
    <div className="sidebar__icons--icon">
      <img src={imageSrc} alt={title} />
    </div>
  )
}

export default Icon
