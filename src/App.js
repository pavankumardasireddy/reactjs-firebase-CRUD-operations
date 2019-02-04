import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './config/firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('orders');
    this.unsubscribe = null;
    this.state = {
      orders: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      const { userName, itemName, orderDate, hasModifiers, category, favoureties, paymentDetails, isPaid, modifiers } = doc.data();
      orders.push({
        key: doc.id,
        doc, // DocumentSnapshot
        userName,
        itemName,
        orderDate,
        hasModifiers,
        category,
        favoureties,
        paymentDetails,
        isPaid,
        modifiers
      });
    });
    this.setState({
      orders
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title" style={{textAlign: 'center'}}>
              ORDERS LIST
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create">Add New Order</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>User Name</th>
                  <th>Order Date</th>
                  <th>Has Modifiers</th>
                  <th>Category</th>
                  <th>Favourities</th>
                  <th>Payment Details</th>
                  <th>Is Paid</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orders.map(order =>
                  <tr>
                    <td><Link to={`/show/${order.key}`}>{order.itemName}</Link></td>
                    <td>{order.userName}</td>
                    <td>{order.orderDate}</td>
                    <td>{(order.hasModifiers)?'yes':'no'}</td>
                    <td>{order.category}</td>
                    <td>{order.favoureties[0].itemName}</td>
                    <td>{order.paymentDetails[0].price}</td>
                    <td>{(order.isPaid)?'yes':'no'}</td>
                    <td>{order.modifiers[0].name}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;