import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageDog: '',
      loading: true,
    }
    this.fetchRandomImageDog = this.fetchRandomImageDog.bind(this);
  }

  componentDidMount() {
    this.fetchRandomImageDog();
  }

  async fetchRandomImageDog() {
    const resultoRandomImageDog = await fetch('https://dog.ceo/api/breeds/image/random');
    const randomImageDog = await resultoRandomImageDog.json();
    const imageDog = randomImageDog.message;
    this.setState({
      imageDog,
      loading: false,
    });
  }

  render() {
    const { imageDog, loading } = this.state;
    const loadingMessage = <span>Loading...</span>
    return loading ? loadingMessage : (
      <div className="App">
        <img src={imageDog} alt="Random dogs" />
        <button onClick={this.fetchRandomImageDog}>Next Dog</button>
      </div>
    );
  }
}

export default App;
