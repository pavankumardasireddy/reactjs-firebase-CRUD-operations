import React, { Component } from 'react';
import firebase from '../config/firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('orders').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          order: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such Order!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('orders').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
      let {order} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">order List</Link></h4>
            <h3 class="panel-title">
              {order.itemName}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Item Name:</dt>
              <dd>{order.itemName}</dd>
              <dt>category:</dt>
              <dd>{order.category}</dd>
              <dt>Order Date:</dt>
              <dd>{order.orderDate}</dd>
              <dt>User Name:</dt>
              <dd>{order.userName}</dd>
              <dt>Has Modifiers:</dt>
              <dd>{(order.hasModifiers)? 'Modifiers added' : 'No modifiers'}</dd>
              <dt>Payment Details:</dt>
              <dd>{order.paymentDetails}</dd>
              <dt>Payment Status:</dt>
              <dd>{(order.isPaid)? 'Payment setteled' : 'Not payed yet'}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;