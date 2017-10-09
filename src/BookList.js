import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import BookCover from './BookCover'
import ModalCategory from './ModalCategory'


class BookList extends Component {

  static propTypes = {
    booksObj: PropTypes.array.isRequired,
  }

  state = {
    expandedBookId: null
  }

  handleBookClick = (book) => {
    let newSelectedBookId = book.id;
    if (this.state.expandedBookId === book.id) {
      newSelectedBookId = null;
    }
    this.setState({expandedBookId: newSelectedBookId});
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true
    });
  }

  handleUpdateClose =() =>{
    let newSelectedBookId = null;
    this.setState({expandedBookId: newSelectedBookId});
  }

  render() {
    let noneSelected = this.state.expandedBookId === null;
    return (
      <div className="udacity-card-container mdl-grid">
        {
          this.props.booksObj.map((bookItem, i) => (
            <div key={i} className={this.state.expandedBookId !== bookItem.id || noneSelected ? 'mdl-cell content-item mdl-mini mdl-card mdl-shadow--3dp' : 'mdl-cell content-item mdl-mini mdl-card mdl-shadow--3dp show-descr'}>
              <div className="content-element">
                <div className="mdl-card mdl-shadow--2dp">
                  <div className="content-img">
                    <div className="img_thumb">
                      <img src={bookItem.imageLinks['thumbnail']} alt="" />

                    </div>
                  </div>
                  <div className="mdl-card__title mdl-card--expand">
                    <h2 className="mdl-card__title-text">{bookItem.title}</h2>
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.handleBookClick.bind(self, bookItem)}>
                      <p>View More</p>
                      <i className="material-icons">keyboard_arrow_right</i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mdl-card mdl-descr">
                <div className="right_item">
                  <i className="material-icons" onClick={this.handleBookClick.bind(self, bookItem)}>close</i>
                  <div className="mdl-card__title mdl-card--expand">
                    <h2 className="mdl-card__title-text">{bookItem.subtitle}</h2>
                  </div>
                  <div className="mdl-card__supporting-text">
                    { (bookItem.description) ? bookItem.description.substring(0,450) : '' }...
                  </div>
                  <div className="cont_rel">
                    <div className="mdl-card__supporting-category">
                      <h6>Categoria:</h6>
                      <ul>
                        <li>
                          { bookItem.categories }
                        </li>
                      </ul>
                    </div>
                    <div className="mdl-card__supporting-author">
                      <h6>Author:</h6>
                      <ul>
                        <li>
                          { bookItem.authors }
                        </li>
                      </ul>
                    </div>
                    <div className="mdl-card__supporting-rating">
                      <h6>Rating:</h6>
                      <ul>
                        <li>
                          { bookItem.averageRating }
                        </li>
                      </ul>
                    </div>
                    <div className="mdl-card__supporting-language">
                      <h6>Language:</h6>
                      <ul>
                        <li>
                          { bookItem.language }
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <a href={bookItem.previewLink} target="_blank" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                      View Book
                    </a>
                    <ModalCategory
                      eventOnClickModal={ this.props.onChangeCategory }
                      categoryItem={ this.props.catObj }
                      selectCat={ bookItem.shelf }
                      iditem={bookItem.id}
                      updateUI={this.handleUpdateClose}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default BookList
