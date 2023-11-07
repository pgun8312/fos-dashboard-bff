
const {
    ConfirmSignUpCommand,
    CognitoIdentityProviderClient,
  }= require("@aws-sdk/client-cognito-identity-provider");
  
  /** snippet-start:[javascript.v3.cognito-idp.actions.ConfirmSignUp] */
  const confirmSignUp = ({ clientId, username, code }) => {
    const client = new CognitoIdentityProviderClient({});
  
    const command = new ConfirmSignUpCommand({
      ClientId: clientId,
      Username: username,
      ConfirmationCode: code,
    });
  
    return client.send(command);
  };
  /** snippet-end:[javascript.v3.cognito-idp.actions.ConfirmSignUp] */
  
  module.exports = confirmSignUp;