import './index.css'

const PasswordItem = props => {
  const {passwordItem, isHidden, deleteCredential} = props
  const {id, siteUrl, username, password, randomColor} = passwordItem
  const {r, g, b} = randomColor

  const onDelete = () => deleteCredential(id)

  const passwordChar = isHidden ? (
    <img
      className="masked-password"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  ) : (
    <p>{password}</p>
  )

  return (
    <li className="password-item">
      <div className="credential-details-container">
        <div
          className="site-logo-container"
          style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}
        >
          <p>{siteUrl[0].toUpperCase()}</p>
        </div>
        <div className="texts-container">
          <p className="site-url">{siteUrl}</p>
          <p className="username">{username}</p>
          <div className="masked-password-box">{passwordChar}</div>
        </div>
      </div>
      <button
        data-testid="delete"
        className="delete-btn"
        type="button"
        onClick={onDelete}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
