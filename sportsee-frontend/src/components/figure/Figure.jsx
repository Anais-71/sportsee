import './figure.css'

function Figure({ title, nb, imageSrc }) {
  return (
    <div className="figure">
      <div className="figure__icon">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="figure__txt">
        <div className="figure__txt--nb">{nb}</div>
        <div className="figure__txt--title">{title}</div>
      </div>
    </div>
  )
}

export default Figure
