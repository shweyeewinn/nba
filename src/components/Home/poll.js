import React, { Component } from 'react';
import axios from 'axios';
import { URL_TEAMS } from '../Utils/paths';

class Poll extends Component {
  state = {
    pollTeams: []
  };

  getPoll = () => {
    axios
      .get(`${URL_TEAMS}?poll=true&_sort=count&_order=desc`)
      .then(response => {
        this.setState({
          pollTeams: response.data
        });
      });
  };
  componentDidMount() {
    this.getPoll();
  }

  addCount(count, id) {
    axios(`${URL_TEAMS}/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ count: count + 1 })
    }).then(() => {
      this.getPoll();
    });
  }

  renderPoll = () => {
    const positions = ['1ST', '2ND', '3rd'];
    return this.state.pollTeams.map((item, index) => (
      <div key={index} className="poll_item">
        <img alt={item.team} src={`/images/teams/${item.logo}`} />
        <h4>{positions[index]}</h4>
        <div>{item.count} Votes</div>
        <button
          className="vote_button"
          onClick={() => this.addCount(item.count, item.id)}
        >
          VOTE
        </button>
      </div>
    ));
  };
  render() {
    console.log(this.state.pollTeams);
    return (
      <>
        <div className="home_poll">
          <h3>Who will be the next champion?</h3>
          <div className="poll_container">{this.renderPoll()}</div>
        </div>
      </>
    );
  }
}

export default Poll;
