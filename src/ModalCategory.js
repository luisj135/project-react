import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl';
import 'react-mdl/extra/material.js';

class ModalCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickDialog = this.handleClickDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  handleClickDialog(){
    console.log(this.props.iditem);
    //console.log(this.state.valueSelect);
    let update = this.props.eventOnClickModal(this.props.iditem, this.state.valueSelect);
    if(update){
      this.props.updateUI();
      this.handleCloseDialog();
    }

  }

  handleChange(event){
    this.setState({
      valueSelect: event.target.value
    });
  }

  render() {
    return (
      <div className="modalbtn">
        <Button onClick={this.handleOpenDialog} raised ripple>Change Category</Button>
        <Dialog open={this.state.openDialog}>
          <DialogTitle>Select a category from the list?</DialogTitle>
          <DialogContent>
            <select defaultValue={this.props.selectCat} id="select-cat" onChange={this.handleChange}>
              {
                this.props.categoryItem.map((itemCat, i) =>(
                  <option key={i} value={itemCat.slug}>{itemCat.name}</option>
                ))
              }
            </select>
          </DialogContent>
          <DialogActions fullWidth>
            <Button type='button' onClick={this.handleClickDialog}>Confirm</Button>
            <Button type='button' onClick={this.handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ModalCategory