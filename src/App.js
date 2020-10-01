import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageDog: "",
      loading: true,
      name: "",
      array: [],
    }
    this.fetchRandomImageDog = this.fetchRandomImageDog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  shouldComponentUpdate(_nextPros, nextState) {
    const dog = "terrier";
    if (nextState.imageDog.includes(dog)) {
      return false;
    }
    return true;
  }

  componentDidUpdate(_prevProps, prevState) {
    const { imageDog, array } = this.state
    if(prevState.imageDog !== imageDog) {
      const dogBreed = imageDog.split('/')[4];
      return alert(dogBreed);
    }
    localStorage.setItem("dogURL", JSON.stringify(array));
  }

  componentDidMount() {
    if(localStorage.dogURL) {
      const parseStorage = JSON.parse(localStorage.dogURL);
      const lastDog = parseStorage[parseStorage.length - 1].imageDog;
      console.log(lastDog);
      return this.setState({ imageDog: lastDog });
    }
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

  handleChange({ target }) {
    const name = target.value;
    this.setState({ name });
  }

  saveData() {
    const { imageDog, name, array } = this.state;
    const dogData = { imageDog, name };
    const newArray = [...array, dogData];
    this.setState({ array: newArray });
    this.setState({ name: "" });
  }

  render() {
    const { imageDog, name } = this.state;
    const loadingMessage = <span>Loading...</span>
    if (imageDog === "") return loadingMessage;
    return (
      <div className="App">
        <p>Dogs</p>
        <button onClick={this.fetchRandomImageDog}>Next Dog</button>
        <div>
          <input
            type="text"
            value={name}
            onChange={this.handleChange}
            placeholder="digite o nome do doguinho"
          />
          <button onClick={this.saveData}>Salvar doguinho</button>
        </div>
        <div>
          <img src={imageDog} alt="Random dogs" />
        </div>
      </div>
    );
  }
}

export default App;
