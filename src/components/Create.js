import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../config/firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('orders');
    this.state = {
        itemName: '',
        category: '',
        userName: '',
        orderDate: '',
        hasModifiers: false,
        favourities: [],
        paymentDetails: [],
        isPaid: false,
        modifiers: []
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { itemName, category, userName } = this.state;

    this.ref.add({
      itemName,
      category,
      userName
    }).then((docRef) => {
      this.setState({
        itemName: '',
        category: '',
        userName: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { itemName, category, userName } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Add New Order
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="itemName">itemName:</label>
                <input type="text" className="form-control" name="itemName" value={itemName} onChange={this.onChange} placeholder="itemName" />
              </div>
              <div className="form-group">
                <label for="description">category:</label>
                <textArea className="form-control" name="category" onChange={this.onChange} placeholder="category" cols="80" rows="3">{category}</textArea>
              </div>
              <div className="form-group">
                <label for="author">userName:</label>
                <input type="text" className="form-control" name="userName" value={userName} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;