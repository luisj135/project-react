import React from 'react'
import BookList from './BookList'
import { Debounce } from 'react-throttle';

class searchBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitialState = () => {
      return { booksObj: [] };
  }


  render() {
    return (
     <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author and click on the icon!"
                value={this.state.queryValue}
                onChange={
                  (event) => this.props.clickquery(event.target.value.trim())
                }
              />
            </Debounce>
            <div className="search_send" onClick={() => this.props.clickquery(this.state.queryValue)}>
              <span className="icon-search"></span>
            </div>
          </div>
        </div>
        <div className="search-books-results">
          <div className="mdl-cell mdl-cell--12-col contenido">
            <div className="udacity-section-title mdl-typography--display-1-color-contrast">
              <h2>Books Available</h2>
            </div>
            {(this.props.booksObj.length > 0) ? '': 'No data available'}
            <BookList onChangeCategory={this.props.onChangeCategory} booksObj={this.props.booksObj} catObj={this.props.catObj}/>
          </div>
        </div>
      </div>
    )
  }
}

export default searchBook
