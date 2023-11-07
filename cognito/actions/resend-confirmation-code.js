
const {
    ResendConfirmationCodeCommand,
    CognitoIdentityProviderClient,
  } = require("@aws-sdk/client-cognito-identity-provider");
  
  /** snippet-start:[javascript.v3.cognito-idp.actions.ResendConfirmationCode] */
  const resendConfirmationCode = ({ clientId, username }) => {
    const client = new CognitoIdentityProviderClient({});
  
    const command = new ResendConfirmationCodeCommand({
      ClientId: clientId,
      Username: username,
    });
  
    return client.send(command);
  };
  /** snippet-end:[javascript.v3.cognito-idp.actions.ResendConfirmationCode] */
  
  module.exports = resendConfirmationCode ;