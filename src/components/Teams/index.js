import React, { Component } from 'react';
import axios from 'axios';
import { URL_TEAMS } from '../Utils/paths';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
class Teams extends Component {
  state = {
    teams: [],
    filtered: [],
    keyword: ''
  };

  componentDidMount() {
    axios.get(URL_TEAMS).then(response => {
      this.setState({
        teams: response.data,
        filtered: response.data
      });
    });
  }

  renderList = filtered =>
    filtered.map((item, index) => (
      <CSSTransition key={index} timeout={500} className="fade team_item">
        <Link to={`/team/${item.name}`}>
          <img alt={item.name} src={`/images/teams/${item.logo}`} />
          <p className="team_name">{item.name}</p>
        </Link>
      </CSSTransition>
    ));

  searchTeams = event => {
    const keyword = event.target.value;
    if (keyword !== '') {
      const list = this.state.teams.filter(item => {
        //return array with new value
        return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      this.setState({
        filtered: list,
        keyword
      });
    } else {
      this.setState({
        filtered: this.state.teams,
        keyword
      });
    }
  };
  render() {
    return (
      <div className="teams_component">
        <div className="teams_input">
          <input
            type="text"
            value={this.state.keyword}
            onChange={e => this.searchTeams(e)}
            placeholder="Search for a team"
          />
        </div>
        <div className="teams_container">
          <TransitionGroup component="span">
            {this.renderList(this.state.filtered)}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default Teams;
