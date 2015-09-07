if (Meteor.isClient) {
  Template.body.events({
    'click #quick': function () {
      Meteor.logout();
      // exactly how much we pause here doesn't seem to matter too much
      setTimeout(function () {
        Meteor.loginWithPassword('foo@example.com','password',
                                 function (error) {
                                   console.log(error);
                                 });
      }, 500);
    }
  });
}

if (Meteor.isServer) {
  Accounts.removeDefaultRateLimit();
  Meteor.startup(function () {
    try {
      Accounts.createUser({
        email: 'foo@example.com',
        password: 'password'
      });
    } catch (e) {}
  });
}
