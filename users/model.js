const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

const USER = "user"; 

// Clear out existing users
async function deleteAllUsers() {
    const query = datastore.createQuery(USER);
    const [users] = await datastore.runQuery(query);
  
    const keys = users.map((user) => user[datastore.KEY]);
    await datastore.delete(keys);
}

deleteAllUsers()
    .then(() => console.log('All users have been deleted'))
    .catch((error) => console.error('Error deleting users:', error));

//////////////////////////////////////////////////////////////////////////////

function userFromDatastore(user){
    user.id = user[Datastore.KEY].id;
    return user;
}

async function isNewUser(sub) {
    const query = datastore.createQuery(USER).filter('sub', '=', sub);
    const [users] = await datastore.runQuery(query);
    if (users.length > 0) return false;
    return true;
}

// User CRUD /////////////////////////////////////////////////////////////////

async function getAllUsers() {
    const query = datastore.createQuery(USER);
    const [users] = await datastore.runQuery(query);
    return users.map(user => userFromDatastore(user));
}

async function addUser(oidc) {
    if (await isNewUser(oidc.user.sub)) {
        var key = datastore.key(USER);
        const newUser = { "sub": oidc.user.sub, "name": oidc.user.name, "email": oidc.user.email };
        await datastore.save({ "key": key, "data": newUser });
    }
} 

module.exports = { getAllUsers, addUser };