const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017/names';

mongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Невозможно подключиться к серверу mongoDB. Ошибка: ', err);
  } else {
    console.log('Соединение установлено для ', url);

    let collection = db.collection('names');

    let name1 = {name: 'Roman',  gender: 'm'};
    let name2 = {name: 'Ivan',   gender: 'm'};
    let name3 = {name: 'Fedor',  gender: 'm'};
    let name4 = {name: 'Anna',   gender: 'f'};
    let name5 = {name: 'Semen',  gender: 'm'};

    collection.insert([name1, name2, name3, name4, name5], (err, result) => {
      if (err) {
        console.log(err);
      } else {

        collection.find({}).toArray( (err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length) {
            console.log('Исходная коллекция: ', result);
          } else {
            console.log('Нет документов с данным условием поиска');
          }
        });

        collection.update({name: 'Anna'}, {'$set': {name: 'Ira'}});
        collection.update({name: 'Semen'}, {'$set': {name: 'Petr'}});

        collection.find({}).toArray( (err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length) {
            console.log('Измененная коллекция: ', result);
          } else {
            console.log('Нет документов с данным условием поиска');
          }
        });

        collection.remove({name:'Ira'});
        collection.remove({name:'Petr'});

        collection.find({}).toArray( (err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length) {
            console.log('Коллекция после удаления: ', result);
          } else {
            console.log('Нет документов с данным условием поиска');
          }
        });
        collection.remove();
      }
      db.close();
    });
  }
});