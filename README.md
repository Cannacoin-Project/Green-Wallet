# Green Wallet Staging/Integration

Caution: This project is still in development & is not suitable for production use. Some key features are still missing and will be integrated soon.

Join the Green Wallet project by submitting your pull requests today! Forks & branches are encouraged!

# Getting Started
- Download & Install the latest version of Meteor.js framework
- Configure your coins daemon or QT with the proper RPC User/Password settings.
- Edit the settings.json file in the project root to match your wallet RPC user/pass/port etc.
- From the command line run the follow: meteor --settings="settings.json"

(If you're unsure what to work on, search "TODO:" and find something that needs work!)

# TODO's:

- Insert new mongo document for each generated address (currently pulling from daemon direclty)
- Insert new mongo document for sent transactions
- Configure coin daemon walletnotify feature to insert incoming tx's into our database
- Basic test cases using Mochajs/Phantomjs & Casperjs