MENTor:

This application is about mental-health disorders.
It is running on MongoDB database and the application is connected with it via mongoose.

The styling of the page has been implemented via vanilla CSS and bootstrap and the Full Stack development via express-js and EJS.

In order to run the application the mongodb has to be installed and run. The MENTor db should also have saved the activities and the mental-health disorders.

After installing and connecting with the database, run the application with "node app.js" command, or with "nodemon app.js" command.

In this version the application has:
• Homepage: The sections of the homepage are the intro banner, the activities carousel, mental-health carousel, donate & join and 24-hour support.
• Activities page: There the activities are presented. The user can see the activities that are in the db. He can see the details of each event and then "participate" in some of them. In case the user clicks "Join" and hasn't logged in he is directed to the login page.
• My activities page: This is the page where the activities of the specific user are presented. If a user has "joined" a certain activity, this activity will appear in this page. The access in this page can be made through the dropdown navigation manu of the user's options and when a user clicks to attend an activity.
• Mental-health page: This page has many sections. The implemented ones are the banner intro, the carousel of some basic info about some mental-health disorders and the symptoms for mental-health disorders. In this page there is a secondary navigation bar which is made in order to navigate insinde the page/
•  Log In & Sign Up pages.


All of the pages have the same main navigation bar and the same footer

User authentication is made through username and password matching with the database's entries.
Most of the pages are responsive.
