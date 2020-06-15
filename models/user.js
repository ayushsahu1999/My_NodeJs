
const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

class User {
  constructor (username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save () {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart (product) {
  //   const cartProduct = this.cart.items.findIndex(cp => {
  //     return cp._id === product.id;
  //   });

    const updatedCart = {items: [{...product, quantity: 1}]};

    const db = getDb();
    db.collection('users').updateOne({_id: new mongodb.ObjectID(this._id)}, {$set: {cart: updatedCart}});
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').find({_id: mongodb.ObjectID(userId)}).next()
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
  }

}


module.exports = User;
