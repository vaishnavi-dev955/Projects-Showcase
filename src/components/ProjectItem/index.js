import './index.css'

const ProjectItem = props => {
  const {projectItemData} = props
  const {name, imageUrl} = projectItemData
  return (
    <li className="listItem">
      <img src={imageUrl} alt={name} className="Project-Image-style" />
      <p className="project-para">{name}</p>
    </li>
  )
}

export default ProjectItem
