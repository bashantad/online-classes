## One line project summary
We are building a virtual classroom, teachers can organise live classroom remotely.

### Tech stack
 We are using `Ruby on Rails` on the backend and `React` on the front end.

### Pre-requisite to run the project
* Install `rvm`(or `rbenv`) to manage ruby versions
* Install `nvm` to manage node versions
* Install ruby version `ruby-2.5.8` using `rvm install 2.5.8` followed by `rvm use 2.5.8`
* Install `postgresql` database. Instructions varies depending on your operating system
* Install node `nvm install 13.1` followed by `nvm use 13.1`

### Install Dependencies
* Install `bundler` and other necessary gems needed for the rails project to work 
```
    gem install bundler
    bundle install
```
* Install `javascript` dependencies by using following command. Alternatively, we can also use yarn to install js dependencies
```
    npm install
```

### Database Setup
Before running following commands make sure you have `postgresql` installed and is running on your computer.
Make sure you can login to postgresql by entering `psql` on command line.

* Create database
```
    rails db:create
```
* Create schema(tables) in the database
```
    rails db:migrate
```
* Populate test data in local to start working
```
    rails db:seed
```
### Run project locally
Run the following command to start the server at http://localhost:3000/
```
    rails s
```
Also make sure to run `./bin/webpack-dev-server` to compile JS in the background upon saving.

Note: If you run into issues while this project, you are welcome to suggest changes on README so that future developers wouldn't have to go through the same issues.

Happy coding!! 
```
    Let's make the education affordable and inclusive for everyone.
```
 
