import React, { Component } from 'react';
import axios from 'axios';

import SliderWidget from '../Utils/Slider';

import { URL_Home } from '../Utils/paths';

class Home extends Component {
  state = {
    home: ''
  };
  componentDidMount() {
    axios.get(URL_Home).then(response => {
      //console.log(response.data);
      this.setState({
        home: response.data
      });
    });
  }
  render() {
    return (
      <>
        <SliderWidget slides={this.state.home.slider} />
      </>
    );
  }
}

export default Home;
