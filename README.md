# Umi (formerly ecolocation)

"Umi 海", Japanese for ocean or sea

## Description

Umi is a *conceptual* loyalty card app for use at businesses that promote sustainable or eco-friendly practices. Users are rewarded for shopping sustainably and can use points earned to purchase items at the store. Items either give to a local cause or offer reusable products. 

Businesses can generate a QR code on their dashboard. On purchase of an item, users are offered to scan the QR code which will automatically update their account with new points. 

### Getting Started

1. In your terminal: ``git clone https://github.com/Ollie-C/umi.git`` 
2. Install dependencies: ``npm i / npm install / yarn install``
3. Give it a whirl: ``npm run``

### Using the app

The app is currently conceptual. As of 19/03/23, Google Maps API has been disabled on the app and the search will only returns organisations stored in the database (which consists of mock businesses and user-added organisations. 

The QR-code-verified points functionality can be tested though. To do this you will need access to 2 devices:

PART A - **Create a fake business**
1. Create a google account (Firebase auth stores login details. Please let me know if you'd like these deleted!)
2. Head over to your profile page in the top right hand corner of the landing page.
3. Click "Add organisation". Fill in some general data for your organisation
4. Head back to your profile page and click on **Go to Dashboard** and generate a QR code on the dashboard
5. Find your new organisation added to the list of organisation (doesn't matter what you type into search). Go to your new page

PART B - **Collect points as a user**
5. Logged in on your phone, scan the QR code with your camera and follow the link. 
6. On your other device, you will now notice the "Collect points" button is now enabled. Click this to add points to your account.
7. Verify points have been added by navigating back to your profile page. 

## Details

### Screenshots

[Coming soon]

### What did I use to build this? 
* React
* JavaScript
* Firebase Auth
* Firestore
* qrcode
* SASS
* GCP

### Limitations
* I have temporarily disabled the Google Maps API. A map will not be rendered, and results will not be dynamic. 
* Shop is currently in an early stage
* Users can not yet edit business details on their dashboard
* I have only integrated Google Login through Firebase Auth. Email and password logins will be added later

### Final note
Any questions then feel free to drop me a message or email! 
