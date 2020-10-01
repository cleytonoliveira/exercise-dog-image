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

  shouldComponentUpdate(_nextPros, nextState) {
    const dog = 'terrier';
    if (nextState.imageDog.includes(dog)) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { imageDog } = this.state
    localStorage.setItem('dogURL',imageDog);
    const dogBreed = imageDog.split('/')[4];
    alert(dogBreed);
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
        <p>Dogs</p>
        <button onClick={this.fetchRandomImageDog}>Next Dog</button>
        <div>
          <img src={imageDog} alt="Random dogs" />
        </div>
      </div>
    );
  }
}

export default App;
