import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class CarouselBlock extends Component {
  render() {
    return (
      <Carousel showStatus={false} showThumbs={false}>
        {
          this.props.objlist.map(
            (book) => (
              <div className="li_item_carrusel" key="{book.id}">
                <div className="text_item">
                    <div className="mdl-cell mdl-cell--5-col cont_data_item">
                      <div className="likes_data">
                        <span className="icon_heart"></span>
                        <p>{book.pageCount}</p>
                      </div>
                      <div className="datatitle_item">
                        <h4>{book.title}</h4>
                        <h6>{book.subtitle}</h6>
                        <h6>{book.categories}</h6>
                        <h6>{book.publishedDate}</h6>
                      </div>
                    </div>
                    <div className="mdl-cell mdl-cell--4-col category_item">
                      <div className="top_category">
                        <h5>Category</h5>
                      </div>
                      <div className="items_list_category">
                        <ul>
                          {
                            this.props.categoryobj.map(
                              (categoryItem) => (
                                <li key={categoryItem.id} className={ (book.shelf === categoryItem.slug )? 'active':''
                                }>{categoryItem.name}</li>
                              )
                            )
                          }
                        </ul>
                      </div>
                    </div>
                </div>
                <div className="bg_image">
                  <img src={book.imageLinks['thumbnail']} alt=""/>
                </div>
              </div>
            )
          )
        }
      </Carousel>
    )
  }
}

export default CarouselBlock
