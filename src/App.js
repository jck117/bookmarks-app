//14.14 React Router

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
    bookmarks,
    error: null,
  };


  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { page, bookmarks } = this.state;
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          {/* Using 'render' allows us to write the JSX
          for these components and thus specify the props to pass (p. 31) */}
          {/* The function we give to the render prop is given a parameter called "Route-props". 
          The Route props has keys for match, location, and history. Because of these keys, we can 
          destruct the history key out of the route props when describing the function 
          parameters like so: render={({ history }) => {.
          This gives us the history object directly to one of the routes! (p. 35)*/}
          <Route
            path='/add-bookmark'
            render={({history})=> {
                return <AddBookmark
                  onAddBookmark={this.addBookmark}
                  /*
                  The push method was used to "push" a new path onto the browser's history, 
                  i.e. to navigate to a new page. We can also use the history.goBack() method 
                  to go back to the previous entry in the browser's history; 
                  as you would when clicking the back button.
                  */
                  onClickCancel={() => history.push('/')}
            />}}        
          />
          <Route
            exact path='/'
            render={() =>
              <BookmarkList bookmarks = {bookmarks}
            />}
          />  
        </div>
      </main>
    );
  }
}

export default App;
