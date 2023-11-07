const { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } = require('amazon-cognito-identity-js');
//pool data
const poolData ={
    UserPoolId: 'us-east-1_OPmGhkM4H',
    ClientId: '4l02tejhcjbsm702mfm6glrc7t'
}

//initialize the pool data
const userPool = new CognitoUserPool(poolData);


//handle User registration
const signUpUser = (userName, password, email, secretHashAttribute, callback) => {
    const userAttributes = [];
    const validationAttributes = [];

    //adding email attribute if provided
    if(email) {
        const emailAttribute = new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        })

        userAttributes.push(emailAttribute);
    }

    if(secretHashAttribute) {
        validationAttributes.push(secretHashAttribute);
    }

    //signUp the user
    userPool.signUp(userName, password,userAttributes,validationAttributes, callback); //call back for handling the response
}
module.exports = {
    userPool,
    signUpUser
}