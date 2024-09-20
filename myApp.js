require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected...'))
//   .catch(err => console.log(err));

// mongoose.connection.on('error', (err) => console.log('connection error', err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
  
})

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({name: "Ahmad", age: 24, favoriteFoods: ["eggs","meat","chicken"]});
  newPerson.save((err,data) => {
    if (err) return done(err)
      done(null ,data);
    })
    
};



const createManyPeople = (arrayOfPeople, done) => {
   arrayOfPeople = [
    {name: "Ali", age: 23 , favoriteFoods:['egg','noodles','vegetables']},
    {name: "Alos", age: 26 , favoriteFoods:['egg','maggie','ayam']},
    {name: "Abuya", age: 27 , favoriteFoods:['egg','soup','vegetables']}
  ]
 
  Person.create(arrayOfPeople,(err,people) => {
    if(err) return console.log(err);
    done(null, people);
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName}, (err,findPerson) => {
    if(err) return done(err);
    done(null, findPerson);
  });

};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err,favfood) => {
    if(err) return done(err);
    done(null,favfood);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err,pId) => {
    if(err) return done(err);
    done(null,pId);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err,person) =>{
    if(err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err,updatedPerson) => {
      if(err) return done(err);
      done(null,updatedPerson);
    })

  } )
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName},{age: ageToSet}, {new: true} , (err,dataP) => {
    if(err) return done(err);
    done(null, dataP);
  })
  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId} , (err, delPerson) => {
    if(err) done(err);
    done(null,delPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, nameRem) => {
    if(err) return done(err);
    done(null,nameRem);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec((err, data) => {// exec is use to execute a query
    if(err) return done(err)
      done(null,data);
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
