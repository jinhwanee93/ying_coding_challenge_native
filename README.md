# CODING CHALLENGE

### How to run the Application:

### Install the dependencies, and link it through the react-native cli
1.```npm install```
2.```react-native link```

### Two options to run the application include:
1.```react-native run-ios```

or

2.```Use Xcode to fire off IOS project by building it through the application```
  a. Project_Directory/ios/PROJECT_NAME.xcodeproj

### ElephantSQL Instance Required:

1. Create a ```.env``` file to store POSTGRES_URL link and exporting it to the proper files
  a. database/db_config.js 

2. Go to elephantSQL website, sign up and create the instance using the free instance
3. Copy and Paste link to the ```.env``` file.


### Application initialization setting

1. Application is initially set to the ToDoList route, if the ```initial``` code is move to the designated route, the route will fire off that component first.