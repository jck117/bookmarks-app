import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import './AddBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class AddBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description } = e.target
    const rating = parseInt(e.target.rating.value)
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating
    }
    console.log(bookmark)
    this.setState({ error: null })
    const fetchUrl = config.API_ENDPOINT + '/api/bookmarks'
    console.log(fetchUrl)
    fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        "content-type": "application/json; charset=utf-8",
        'Authorization':  config.API_KEY
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))          
        }
        return res.json()
      })
      .then(data => {
        /*
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        */
        this.context.addBookmark(data)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })
  }


  handleClickCancel = () => {
    this.props.history.push('/')
  };
  
  render() {
    const { error } = this.state
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue='3'
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddBookmark;
