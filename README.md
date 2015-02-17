

# Green Wallet Staging/Integration

[![Build Status](https://api.shippable.com/projects/54e3067d5ab6cc13528c48c9/badge?branchName=master)](https://app.shippable.com/projects/54e3067d5ab6cc13528c48c9/builds/latest)

Caution: DO NOT TAKE THIS BADGE AS AN INDICATOR OF A PRODUCTION WORTH APP.
This project is still in development & is not suitable for production use.
Some key features are still missing and will be integrated in the coming weeks.


Join the Green Wallet project by submitting your pull requests today! Forks & branches are encouraged!

# Getting Started
- Download & Install the latest version of Meteor.js framework
- Configure your coins daemon or QT with the proper RPC User/Password settings.
- Edit the settings.json file in the project root to match your wallet RPC user/pass/port etc.
- From the command line run the follow: meteor --settings="settings.json"

(If you're unsure what to work on, search "TODO:" in the project directory or find the list on github and find something that needs work!)

# TODO's:

- Insert new mongo document for each generated address (currently pulling from daemon directly).
- ~~Insert new mongo document for sent transactions.~~
- ~~Daemonize getInfo server method and update details in network collection.~~
- Configure coin daemon walletnotify feature to insert incoming tx's into our database.
- Add transaction pagination 
- Make the user settings actually work... (form is already in place, just need to pull from DB).
- Add basic unit testing using Mochajs/Chai.
- ~~Add basic integration testing using Mochajs/Phantomjs & Casperjs.~~
- ~~Setup shippable.com continuous integration file & bash script (SubCreative will do this).~~

# TESTING

