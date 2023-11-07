const {
    SignUpCommand,
    CognitoIdentityProviderClient,
  } =require( "@aws-sdk/client-cognito-identity-provider");
  
  /** snippet-start:[javascript.v3.cognito-idp.actions.SignUp] */
  const signUp = ({ clientId, username, password, userAttributes }) => {
    const client = new CognitoIdentityProviderClient({});
  
    const command = new SignUpCommand({
      ClientId: clientId,
      Username: username,
      Password: password,
      UserAttributes: [
        ...userAttributes,
        {
          Name: "custom:role", //setting the default user role
          Value: "User",
        }
      ],
    });
  
    return client.send(command);
  };
  /** snippet-end:[javascript.v3.cognito-idp.actions.SignUp] */
  
  module.exports =  signUp ;