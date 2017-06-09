# Meals On Wheels
Meals on Wheels app

**IMPORTANT**
Node modules require clean install upon git pull from the master branch.
To acquire said modules run a command window in the package directory > enter "npm run install-dependencies"

NOTES:
- ATM we are using a diffrent database "my_schema" for authentication. we can create this with the create_database.js file in the /node/scripts folder. this cn be edited in the /node/config folder.
- Any errors persist about sequilize, ensure mow database has been deleted then re-created