import React, { Component } from 'react';
import firebase from '../config/firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        key: '',
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

  componentDidMount() {
    const ref = firebase.firestore().collection('orders').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const order = doc.data();
        this.setState({
            key: doc.id,
            itemName: order.itemName,
            category: order.category,
            userName: order.userName,
            orderDate: order.orderDate,
            hasModifiers: order.hasModifiers,
            favourities: order.favourities,
            paymentDetails: order.paymentDetails,
            isPaid: order.isPaid,
            modifiers: order.modifiers
        });
      } else {
        console.log("No such Order!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({order:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { itemName, category, userName } = this.state;

    const updateRef = firebase.firestore().collection('orders').doc(this.state.key);
    updateRef.set({
      itemName,
      category,
      userName
    }).then((docRef) => {
      this.setState({
        key: '',
        itemName: '',
        category: '',
        userName: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT order
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">order List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="itemName">itemName:</label>
                <input type="text" className="form-control" name="itemName" value={this.state.itemName} onChange={this.onChange} placeholder="itemName" />
              </div>
              <div className="form-group">
                <label for="category">category:</label>
                <input type="text" className="form-control" name="category" value={this.state.category} onChange={this.onChange} placeholder="category" />
              </div>
              <div className="form-group">
                <label for="userName">userName:</label>
                <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.onChange} placeholder="userName" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;