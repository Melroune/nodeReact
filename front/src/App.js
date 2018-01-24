import React, { Component } from 'react';
import Gift from './Gift';
import logo from './logo.png';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifts: []
    };

	this.removeGift = this.removeGift.bind(this);
	this.getGift = this.getGift.bind(this);
	this.addGift = this.addGift.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount(){
	  this.getGift()
  }

  notify()  {
	  if (this.state.gifts.length < 1) return;
	  var str = this.state.gifts.map((element) => element.name+'\n')

	  axios({
	   method: 'post',
	   url: 'http://localhost:3001/notify',
	   data: {
		 "list": str,
	   }
	  }).then((result) => {
	   this.setState({"gifts": result.data})
	  })
  }

  getGift() {
	  axios.get('http://localhost:3001/')
	.then(
		(result) => {
		  this.setState({"gifts": result.data})
		}
	)
  }

	addGift(e){
		e.preventDefault();
		console.log(e.target[0].value);
		if(!e.target[0].value || e.target[0].value === '') return
		else{
			axios({
			 method: 'post',
			 url: 'http://localhost:3001',
			 data: {
			   "name": e.target[0].value,
			 }
		 	}).then((result) => {
			 this.setState({"gifts": result.data})
		 	})
 }
	}

  removeGift(index) {
	 axios({
	  method: 'delete',
	  url: 'http://localhost:3001',
	  data	: {
	    index,
	  }
  }).then((result) => {
	  this.setState({"gifts": result.data})
  })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">It's Christmas !</h1>
        </header>

        <img alt="brad" src="https://media.giphy.com/media/JltOMwYmi0VrO/giphy.gif" />

        <form onSubmit={this.addGift}>
          <input type="text"/>
          <button type="submit"> Ajouter </button>
        </form>
        <div className="GiftWrapper">
		  {this.state.gifts ? this.state.gifts.map((gift, index) => <Gift key={index} name={gift.name} remove={() => this.removeGift(index)} /> ) : null}
        </div>

        <button type="button" onClick={this.notify} className="mail"> Dear Santa Florian, send me my gifts</button>

      </div>
    );
  }
}

export default App;
