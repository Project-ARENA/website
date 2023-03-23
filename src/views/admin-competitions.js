import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import DataGrid from "../components/datagrid";
import './admin-competitions.css'

function GenGrid() {
  const [rows, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get/competitions")
      .then((response) => {
        const data = response.data.map((data, index) => ({
          id: index + 1,
          competition_id: data.competition_id,
          competition_name: data.competition_name,
          competition_views: data.competition_views,
          competition_image: data.competition_image,
          competition_leaderboard: data.competition_leaderboard,
          competition_startdate: data.competition_startdate,
          competition_enddate: data.competition_enddate,
          competition_info: data.competition_info,
          competition_testcases: data.competition_testcases,
        }));
        setData(data);
      });
  }, []);

  const columns = [
    { field: 'competition_id', headerName: 'ID', width: 150 },
    { field: 'competition_name', headerName: 'Title', width: 150 },
    { field: 'competition_views', headerName: 'Views', width: 150 },
    { field: 'competition_image', headerName: 'Image', width: 150 },
    { field: 'competition_leaderboard', headerName: 'Leaderboard', width: 150 },
    { field: 'competition_startdate', headerName: 'Start Date', width: 150 },
    { field: 'competition_enddate', headerName: 'End Date', width: 150 },
    { field: 'competition_info', headerName: 'Info', width: 150 },
    { field: 'competition_testcases', headerName: 'Test Cases', width: 150 },
  ];

  return <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
}

const AdminCompetitions = (props) => {
  return (
    <div className="admin-competitions-container">
      <div data-role="Header" className="admin-competitions-navbar-container">
        <div className="admin-competitions-navbar">
          <div className="admin-competitions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="admin-competitions-image"
            />
            <div
              data-role="BurgerMenu"
              className="admin-competitions-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-competitions-links-container">
              <Link to="/admin-home" className="admin-competitions-link">
                HOME
              </Link>
              <Link to="/admin-competitions" className="admin-competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-competitions-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
          <div className="admin-competitions-container1">
            <Link to="/admin-profile" className="admin-competitions-navlink">
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="admin-competitions-mobile-menu"
          >
            <div className="admin-competitions-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="admin-competitions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="admin-competitions-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="admin-competitions-icon4"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="admin-competitions-links-container1">
              <Link to="/admin-home" className="admin-competitions-link">
                HOME
              </Link>
              <Link to="/admin-competitions" className="admin-competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-competitions-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-competitions-section-separator"></div>
      <div className="admin-competitions-section-separator1"></div>
      <div className="admin-competitions-section-separator2"></div>
      <div className="admin-competitions-section-separator3"></div>

      <GenGrid />

      <div >
      </div>
    </div>
  )
}

export default AdminCompetitions
