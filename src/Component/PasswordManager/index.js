import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

const randomRgb = () => Math.floor(Math.random() * 256)

class PasswordManager extends Component {
  state = {
    siteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    userCredentials: [],
    isHidden: true,
  }

  updateSiteInput = e => this.setState({siteInput: e.target.value})

  updateUsernameInput = e => this.setState({usernameInput: e.target.value})

  updatePasswordInput = e => this.setState({passwordInput: e.target.value})

  updateSearchInput = e => this.setState({searchInput: e.target.value})

  deleteCredential = id => {
    console.log('deleted')
    this.setState(prevState => ({
      userCredentials: prevState.userCredentials.filter(
        eachCredential => eachCredential.id !== id,
      ),
    }))
  }

  addCredentials = e => {
    e.preventDefault()
    const {siteInput, usernameInput, passwordInput} = this.state
    if (siteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const newCredential = {
        id: uuidv4(),
        siteUrl: siteInput,
        username: usernameInput,
        password: passwordInput,
        randomColor: {r: randomRgb(), g: randomRgb(), b: randomRgb()},
      }
      this.setState(prevState => ({
        userCredentials: [...prevState.userCredentials, newCredential],
        siteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({isHidden: !prevState.isHidden}))
  }

  render() {
    const {
      siteInput,
      usernameInput,
      passwordInput,
      searchInput,
      userCredentials,
      isHidden,
    } = this.state

    const filteredCredentials = userCredentials.filter(eachCredential =>
      eachCredential.siteUrl.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const renderPasswordList = () => {
      if (filteredCredentials.length === 0) {
        return (
          <>
            <img
              className="no-password-img"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p className="no-password-text">No Passwords</p>
          </>
        )
      }
      return (
        <ul className="passwords-list">
          {filteredCredentials.map(eachCredential => (
            <PasswordItem
              key={eachCredential.id}
              passwordItem={eachCredential}
              isHidden={isHidden}
              deleteCredential={this.deleteCredential}
            />
          ))}
        </ul>
      )
    }

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <div className="header">
            <img
              className="logo-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
            />
          </div>

          <div className="inputs-section">
            <img
              className="pw-manager-img-sm"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />

            <form className="input-form" onSubmit={this.addCredentials}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-and-icon">
                <img
                  className="form-input-icons"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  type="text"
                  value={siteInput}
                  onChange={this.updateSiteInput}
                  placeholder="Enter Website"
                />
              </div>

              <div className="input-and-icon">
                <img
                  className="form-input-icons"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  value={usernameInput}
                  onChange={this.updateUsernameInput}
                  placeholder="Enter Username"
                />
              </div>

              <div className="input-and-icon">
                <img
                  className="form-input-icons"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={this.updatePasswordInput}
                  placeholder="Enter Password"
                />
              </div>

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              className="pw-manager-img-lg"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>

          <div className="display-section">
            <div className="display-section-header">
              <div className="password-count-wrapper">
                <h1 className="password-count-text">Your Passwords</h1>
                <span className="password-count">
                  <p>{userCredentials.length}</p>
                </span>
              </div>

              <div className="search-input-wrapper">
                <button type="button" className="search-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </button>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.updateSearchInput}
                />
              </div>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                onChange={this.toggleCheckbox}
                className="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {renderPasswordList()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
