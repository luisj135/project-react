import React from 'react'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBooks'
import BookList from './BookList'
import Carrousel from './CarrouselBlock'


import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksObj: [],
      electCategory: '',
      categoryList: [
      {
        id:'1',
        name: 'currently reading',
        slug: 'currentlyReading',
        items:[]
      },
      {
        id:'2',
        name:'want to read',
        slug: 'wantToRead',
        items:[]
      },
      {
       id:'3',
       name:'read',
       slug:'read',
       items:[]
      }]
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksObj) => {
      this.setState({
        booksObj: booksObj
       });

      var categoryList = this.state.categoryList.map((itemCat) => {

        let bookfil = booksObj.filter((c) => c.shelf === itemCat.slug);

        if (bookfil.length > 0){
          itemCat.items = bookfil;
        }
        return itemCat;
      })

      this.setState({
        categoryList,
      })
    })
  }

  ChangeCategory = (iditem, newCategory) => {
    BooksAPI.update({id: iditem}, newCategory).then(async (newObjbook) => {
      BooksAPI.getAll().then((booksObj) => {
        this.setState({ booksObj });

        var categoryList = this.state.categoryList.map((itemCat) => {

          let bookfil = this.state.booksObj.filter((c) => c.shelf === itemCat.slug);

          if (bookfil.length > 0){
            itemCat.items = bookfil;
          }
          return itemCat;
        })

        this.setState({
          categoryList,
        })
      })
    })
    return true;
  }

  ClickSearch = (valueSearch) => {
    if(valueSearch.length > 0){
      BooksAPI.search(valueSearch, 20).then(async (newObjSearch) => {
        if(typeof newObjSearch.error === 'undefined'){
          this.setState({
            booksObj: newObjSearch
          });
        }else{
          this.setState({
            booksObj: []
          });
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
           <SearchBook
            clickquery={this.ClickSearch}
            booksObj={this.state.booksObj}
            catObj={this.state.categoryList}
            onChangeCategory={this.ChangeCategory}
           />
        )}/>
        <Route exact path='/' render={() => (
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col gallery_item">
              <Carrousel
                objlist={ this.state.booksObj }
                categoryobj={ this.state.categoryList }
              />
            </div>
            <div className="mdl-cell mdl-cell--12-col contenido">
              { this.state.categoryList.map((category) => {
                    return (
                    <div key={category.id} className="udacity-more-section">
                      <div className="udacity-section-title mdl-typography--display-1-color-contrast">
                        <h2>Category {category.name}</h2>
                      </div>

                      <BookList  onChangeCategory={this.ChangeCategory} booksObj={category.items} catObj={this.state.categoryList}/>
                    </div>)
                  }
                )
              }

            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
