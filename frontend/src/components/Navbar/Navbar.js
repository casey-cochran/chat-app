import { useNavigate } from 'react-router';
import { csrfFetch } from '../../store/csrf';
import './Navbar.css';
import Search from './Search';

const Navigation = () => {
  const navigate = useNavigate();
  const logOut = async() => {
    const response = await csrfFetch('/user/logout', {
      method: "DELETE"
    });
    const data = await response.json();
    navigate('/login');
    console.log(data, 'logout success')
  }

  return (
    <nav className="navbar test nav-bg border-bottom navbar-expand-lg navbar-light py-5">
      <div className="container-fluid d-flex flex-row-reverse">
        <a className="navbar-brand text-black w-25 text-center" href="#">
          Chat-App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end w-25">
            <li className="nav-item ">
              <a className="nav-link active text-black" aria-current="page" href="#">
                Home
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#" onClick={logOut}>
                    sign out
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                {/* <li><hr className="dropdown-divider"></li> */}
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
            <Search />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
