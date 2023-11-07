//commonly included in AWS Lambda functions to configure the environment for potential AWS service interactions.
const AWS = require('aws-sdk');

const handler = async (event) => {
    //extract the userAttributes
    const userAttributes = event.request.userAttributes;

    //default role
    const defaultRole = "User";

    //assign the userRole to attribuite
    if(!userAttributes['custom:role']) {
        userAttributes['custom:role'] = defaultRole;
    }

    //return modified user attribute
   // event.response.autoConfirmUser = true;  //if want to autmatically confirm the user without email verification
    return event;
}

export {handler};