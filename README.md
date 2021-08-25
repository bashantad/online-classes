## One line project summary
We are building a virtual classroom, teachers can organise live classroom remotely.

### Tech stack
 We are using `Ruby on Rails` on the backend and `React` on the front end.

### Pre-requisite to run the project
* Install `rvm`(or `rbenv`) to manage ruby versions
* Install `nvm` to manage node versions
* Install ruby version `ruby-2.6.6` using `rvm install 2.6.6` followed by `rvm use 2.5.8`
* Install `postgresql` database. Instructions varies depending on your operating system
* Install node `nvm install 13.1` followed by `nvm use 13.1`
* Install yarn `npm install yarn`

### Install Dependencies
* Install `bundler` and other necessary gems needed for the rails project to work
```
    gem install bundler
    bundle install
```
* Install `javascript` dependencies by using following command.
```
    yarn install
```

Ask for the `development.key` file and put it under `config/credentials/development.key`

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

Note: If you run into issues while this project, you are welcome to suggest changes on README so that future developers
wouldn't have to go through the same issues.

### Development
We mainly have two kinds of pages
1. React pages and this utilizes core.html.erb layout
2. Other CMS style pages and this utilizes application.html.erb (anything you write in `app/assets/stylesheets/` folder is automatically imported for these pages)
And these two don't share css/javascript files implicitly. If we want to share common css files across both of these pages,
we need to manually import css

### General guidelines on git
When pulling(if you are on master branch)
```
git pull --rebase origin master
```
If you are in other branches but want to apply changes from origin master(from github). It is recommended to do the followings
before creating PR as well, so that you branch is always on top of master.
```
    git fetch;
    git rebase origin/master
    # if you get conflict while doing this, resolve the conflict, then do following
    git add .;
    git rebase --continue
    # if you might get conflict again after you resolve once, but keep resolving conflict
    # followed by git add .; and git rebase --continue until the conflicts are finished.
```
Pushing your changes to remote. Always make sure you are in the right branch
```
    git branch; # Make sure the branch name is yours(not master)
    git status;
    # if it says diverged
        # double make sure you are in a right branch(you don't want to do this in master branch)
        git push -f # this will force push your local changes.
    # else
        git push -u # if you are pushing for the first time
        git push # if it's not your first time
    end

```
Upon creating a new branch, checkout to master, pull and create a new branch
```
    git checkout master
    git pull origin master
    git checkout -b new_branch_name(the name of the branch you want to create)
```

### Routes
in order to find out the routes, do followings
```
    rails routes
```
To filter the routes, you can `grep` multiple times. As an example if I need to find a controller and action for `teaching/courses/start_teaching`, I can type followings
```
    rails routes | grep courses | grep teaching | grep start_teaching
    # outputs start_teaching_teaching_courses GET  /teaching/courses/start_teaching(.:format) teaching/courses#start_teaching
    # If you look into the last part of the above output, it means, it should be inside app/controllers/teaching folder and should be named courses_controller and action(def) is start_teaching.
    # Now, in order to find the view file(erb) for this, you need to look into app/views/teaching/courses/start_teaching.html.erb
```

### Adding new Routes
In order to add new page, add your route in config/routes.rb
```
    eg: resources :quizzes, this creates CRUD routes for quiz.
```
Then create a controller for quiz:
```
    rails generate controller quizzes index # This creates a quizzes controller and index action and creates a file in quizzes/index.html.erb
```
To check your routes do followings:
```
    rails routes | grep quiz # this prints the route for you.
```


### Including js and css
You can include the necessary js and styles at app/assets/javascript and app/assets/stylesheets. But don't include them globally at `theme.css` or `theme.js` unless it's a global thing. You can use javascript_include_tag and stylesheet_link_tag in the view file if you need to include particular javascript or stylesheet file. Below is the example for view includes

Stylesheet
#####
```
<% content_for :stylesheet_includes do %>
  <%= stylesheet_link_tag "libraries/hs-sticky-block.min" %>
<% end %>
```

Javascript
#####
```
<% content_for :javascript_includes do %>
  <%= javascript_include_tag "libraries/hs-sticky-block.min" %>
<% end %>
```

Seed dump
#####
```
    rake db:seed:dump MODELS=Stock APPEND=true
```

Happy coding!!
```
    Let's make the education affordable and inclusive for everyone.
```
