import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProjectItem from '../ProjectItem'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Projects extends Component {
  state = {
    activeCategoryId: categoriesList[0].id,
    projectsData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getProjectsData()
  }

  getProjectsData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {activeCategoryId} = this.state
    const Url = `https://apis.ccbp.in/ps/projects?category=${activeCategoryId}`
    const response = await fetch(Url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = data.projects.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      this.setState({
        projectsData: UpdatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onChangeActiveCategoryId = event => {
    this.setState({activeCategoryId: event.target.value}, this.getProjectsData)
  }

  successView = () => {
    const {projectsData} = this.state
    return (
      <ul className="lists-container">
        {projectsData.map(eachItem => (
          <ProjectItem projectItemData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  LoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onClickTry = () => this.getProjectsData()

  FailureView = () => (
    <div className="Failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="Fail-image-style"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="Retry-button" onClick={this.onClickTry}>
        Retry
      </button>
    </div>
  )

  renderingTheViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.successView()
      case apiConstants.failure:
        return this.FailureView()
      case apiConstants.inProgress:
        return this.LoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeCategoryId} = this.state
    return (
      <>
        <Header />
        <div className="main-container">
          <select
            className="select-container"
            onChange={this.onChangeActiveCategoryId}
            value={activeCategoryId}
          >
            {categoriesList.map(eachItem => (
              <option value={eachItem.id}>{eachItem.displayText}</option>
            ))}
          </select>
          {this.renderingTheViews()}
        </div>
      </>
    )
  }
}

export default Projects
