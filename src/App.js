import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import UpdateBookmark from './UpdateBookmark/UpdateBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import BookmarksContext from './BookmarksContext';


class App extends Component {
  state = {
    bookmarks: [],
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

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(bm => 
      bm.id !== bookmarkId
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

  updateBookmarks = updatedBookmark => {
    const newBookmarks = this.state.bookmarks.map(bookmark => 
      (bookmark.id === updatedBookmark.id) ?
        updatedBookmark
          :
        bookmark
      )
      this.setState({
        bookmarks: newBookmarks
      })
  };

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
    //context provider
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmarks: this.updateBookmarks,
    }

    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              path='/add-bookmark'
              /* [reason for omitting this code: see pgs. 13-15 of module 14.16]
              render={({ history }) => {
                return <AddBookmark
                  onAddBookmark={this.addBookmark}
                  onClickCancel={() => history.push('/')}
                />
              }}
              */
              component={AddBookmark}
            />
            <Route
              exact
              path='/'
              /* [reason for omitting this code: see pgs. 13-15 of module 14.16]
              render={({ history }) => {
                return <BookmarkList bookmarks={bookmarks} />
              }}
              */
              component={BookmarkList}
            />
            <Route
              path='/update-bookmark/:bookmarkId'
              component={UpdateBookmark}
            />
          </div>
        </BookmarksContext.Provider>  
      </main>
    );
  }
}

export default App;





