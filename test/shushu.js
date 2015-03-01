var shushu = require('../index.js');
var sukima = require('sukimajs');

describe('Shushu', function () {
  var User, Users;

  before(function () {
    User = sukima.register({
      name: 'alpha',
      email: 'email'
    });

    Users = shushu(User);
  });

  it('should return an object', function () {
    expect(Users).to.be.an('object');
  });

  it('should has property schema', function () {
    expect(Users).to.has.property('schema');
  });

  it('should emit the event \'new\'', function (done) {
    Users.once('new', function (err, event) {
      if (err) throw err;
      done();
    });

    Users.set({
      name: 'sergiodxa',
      email: 'sergio@xalambri.com.ar'
    });
  });

  it('should emit the event \'updated\'', function (done) {
    Users.once('updated', function (err, event) {
      if (err) throw err;
      done();
    });

    Users.update({
      name: 'sergiodxa',
      email: 'sergiodxa@gmail.com',
    }, 'sergiodxa@gmail.com', 'email');
  });

  it('should emit the event \'removed\'', function (done) {
    Users.once('removed', function (err, event) {
      if (err) throw err;
      done();
    });

    Users.remove('sergiodxa', 'name');
  });

  it('should return the data array', function () {
    expect(Users.getAll()).to.be.an('array');
  });

  it('should return a single datum', function (done) {
    Users.once('new', function (err, event) {
      if (err) throw err;

      var myUser = Users.getSingle('sergiodxa', 'name');

      expect(myUser).to.be.an('object');

      done();
    })

    Users.set({
      name: 'sergiodxa',
      email: 'sergio@xalambri.com.ar'
    });
  });
});