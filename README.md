# umi 海 (ocean in Japanese)

Umi is a *conceptual*, heavy empahsis on conceptual (for now), loyalty card app for use at businesses that promote sustainable or eco-friendly practices. Get rewarded for shopping sustainably and use your points to purchase items at the store. 

Businesses can generate a QR code on their dashboard. On purchase of an item, users are offered to scan the QR code which will automatically update their account with new points. 

### How was it built? 
* React
* JavaScript
* Firebase Auth
* Firestore
* qrcode
* SASS
* GCP

### Firing it up

1. In your terminal: ``git clone https://github.com/Ollie-C/umi.git`` 
2. Install dependencies: ``npm i / npm install / yarn install``
3. Give it a whirl: ``npm run``

### Current features

As a customer: 
* Create a user account
* Add an organisation/business for you to manage
* Search local businesses (currently disabled)
* Scan QR codes to collect points
* Purchase items in the shop (conceptual)

As an organisation: 
* Add your organisation to the growing database
* Generate QR codes for paying customers

### Give it a go

**Creating a mock business**
1. Create a google account (Firebase auth stores login details. Please let me know if you'd like these deleted!)
2. Head over to your profile page in the top right hand corner of the landing page.
3. Click "Add organisation". Fill in some general data for your organisation
4. Head back to your profile page and click on **Go to Dashboard** and generate a QR code on the dashboard
5. Find your new organisation added to the list of organisation (doesn't matter what you type into search). Go to your new page

**Collect points as a user**
1. Logged in on your phone, scan the QR code with your camera and follow the link. 
2. On your other device, you will now notice the "Collect points" button is now enabled. Click this to add points to your account.
3. Verify points have been added by navigating back to your profile page. 

### Notice a bug? 
Please create an issue above! This is an ongoing project and will constantly be updating it. 

### Screenshots

[Coming soon]

### To Do List
- [ ] Re-enable the Google Maps API
- [ ] Generate actual local business data
- [ ] Implement a shop and cart
- [ ] Allow users to fully customise their page
- [ ] Allow businesses to edit their business details
- [ ] Allow for email/password authentication
