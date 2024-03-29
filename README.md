# Underwriting form / AXA Health

This project is my implementation of a multi-step React form.

Step 1 - enter the agent's credentials (name and email address)  
Step 2 - enter the high-level membership details of the transferring member  
Step 3 - add at least one member's details  
step 4 - submit!

**Note: No details are transmitted during the submit process - this is a demo**

## About the application/folder structure

The application is structured in a style of Controller/View components.

The primary routing happens in App.js using React Router. All matched routes are 'dispatched' to a corresponding 'controller' component in _`src/components/route/`_

Each route component will pass most of the presentation to a 'view' component in _`src/components/views/`_

View components are wrapped in one of two layouts in _`src/components/views/layouts`_

The temporary storage of application data is managed using the session storage API and is managed through _`src/services/`_

[Working demo](https://graceful-tiramisu-e8d2e0.netlify.app/)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Screenshots

<img src='/public/images/screenshot1.png' />
<img src='/public/images/screenshot2.png' />
<img src='/public/images/screenshot3.png' />
