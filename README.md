# Underwriting form / AXA Health

This project is my implementation of a multi-step ReactJS form.

Step 1 - enter the agent's credentials (name and email address)  
Step 2 - enter the high-level membership details of the transferring member  
Step 3 - add at least one member's details
step 4 - submit!

**Note: No details are transmitted during the submit process - this is a demo**

## About the application/folder structure

I have attempted to structure the application in a style of Controller/View components.

The main routing happens in App.js using React Router. All matched routes are 'dispatched' to a corresponding component in _`src/components/route/`_

Each route component will pass most of the presentation to a further component in _`src/components/views/`_

View components are wrapped in one of two layouts in: _`src/components/views/layouts`_

The temporary storage of application data is managed using the local storage API and is centrally handled in: _`src/services/`_

[Working demo hosted on Netlify](https://graceful-tiramisu-e8d2e0.netlify.app/)
