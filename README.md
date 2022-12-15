# UMI.CARD (formerly ecolocation)

A loyalty card app for use at eco-friendly organisations and events. 

Copy .env.example to .env using the values sent separately. 


## Description

Umi 海, Japanese for ocean or sea, is a way to help people think about the way they shop by rewarding users for choosing an eco-friendly alternative to their usual
choices. 
Umi.card skips past the tick-bock initiatives and filters out companies employing greenwashing techniques to connect with eco-friendly businesses, events and 
charities.

## Getting Started

### Dependencies

"@iconify/icons-mdi": "^1.2.32",
    "@iconify/react": "^4.0.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.1.3",
    "crypto": "^1.0.1",
    "firebase": "^9.13.0",
    "google-map-react": "^2.2.0",
    "qrcode": "^1.5.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.2",
    "react-scripts": "5.0.1",
    "sass": "^1.55.0",
    "uuid": "^9.0.0",

### Installing

npm i

### App example walkthrough

-- Collect points as a user
1. Log into the app on desktop using the test business user log-in details provided in the .env sent seperately. Give it a whirl
2. Open another instance of the app on your mobile logging in with your own Google account. Leave it on the profile page. Activity and points should be blank.
3. On the business account, go to your profile page, go to dashboard and generate a QR code.
4. Use your user account on mobile to scan the QR code. Accept the prompt to collect your points.
5. Check back on your profile page to see your updated activity and points.

--Create a business
1. On your regular user account, go to profile page and click Connect Organisation. Fill in the form. 
2. Check profile page again to see if business account has been connected.
3. Go back to homepage and search (currently map location and search results are not connected so any location will suffice.)
4. Check for your new business in the search results



## Issues/Bugs
The following are currently broken or incomplete:
* The initiatives part of the app hasn't been implemented fully. All values are hardcoded.
* Search filter bar is not currently functional

