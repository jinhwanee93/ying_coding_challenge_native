# CODING CHALLENGE

### How to set up the Application:

### Install the dependencies, and link it through the react-native cli

1.```npm install```
2.```react-native link```

### ElephantSQL Instance Required:

1. Create a ```.env``` file to store ```POSTGRES_URL``` link, the file is already imported to ```database/db_config.js```
  a. The ```.env``` file should very similar to the ```.env_example``` file.


2. Go to the ```elephantsql.com``` website, sign up and create the "Tiny Turtle" instance so you don't get charged

3. Copy and Paste link to the ```.env``` file.

### Firing up the server

1. Once all the database instance set-up is complete, to serve up the server with the database run:

  ```npm run serve```

### How to run the application, there are two options to run the application include:

1.```react-native run-ios```

or

2. PREFERRED: Use run the project using XCODE, building it by opening up ```WHERE_YOU_CLONED_THE_PROJECT_DIRECTORY/ios/PROJECT_NAME.xcodeproj```
  a. This should fire off the terminal and start to compile the react-native code and run the IOS simulator.
  b. And there you have it... Enjoy