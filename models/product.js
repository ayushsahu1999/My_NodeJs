const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

class Product {
  constructor (title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOb;
    if (this._id){
      // Update the product
      dbOb = db.collection('products').updateOne({_id: new mongodb.ObjectID(this._id)}, 
      {$set: this});
    }
    else {
      dbOb = db.collection('products').insertOne(this);
    }
    
    return dbOb.then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
    
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray().then(products => {
      console.log(products);
      return products;
    }).catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products').find({ _id: mongodb.ObjectID(prodId) }).next()
    .then(product => {
      console.log(product);
      return product;
    }).catch(err => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: mongodb.ObjectID(prodId)})
    .then('Deleted!')
    .catch(err => console.log(err));
  }
}

module.exports = Product;
