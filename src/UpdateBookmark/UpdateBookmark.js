import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
//import './AddBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class UpdateBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    error: '',
    //id: undefined,
    title: '',
    url: '',
    description: '',
    rating: 5
  };

  handleSubmit = e => {
    e.preventDefault()
    const fetchUrl = config.API_ENDPOINT + '/bookmarks/' + this.props.match.params.bookmarkId;
    const num = parseInt(this.state.rating)
    const state2 = {...this.state, rating: num}
    fetch(fetchUrl, {
      method: 'PATCH',
      body: JSON.stringify(state2),
      headers: {
        'content-type': 'application/json',
        'Authorization':  config.API_KEY
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
          this.context.updateBookmarks(state2)
          this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }  

  componentDidMount(){
      const bookmarkId = this.props.match.params.bookmarkId;
      const fetchUrl = config.API_ENDPOINT + '/bookmarks/' + bookmarkId;
      fetch(fetchUrl, {
          method: 'GET',
          headers: {
            "content-type": "application/json",
            'Authorization':  config.API_KEY          
          }
      })
        .then(res => {
            if (!res.ok){
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(responseData => 
            this.setState({
                ...responseData
            })
        )
        .catch(error => console.error(error))
  }

  render() {
    const { error, title, url, description, rating } = this.state
    return (
      <section className='AddBookmark'>
        <h2>Update bookmark</h2>
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
              value={title}
              onChange={this.handleChange}
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
              value={url}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.handleChange}
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
              //defaultValue='1'
              min='1'
              max='5'
              required
              value={rating}
              onChange={this.handleChange}
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

export default UpdateBookmark;