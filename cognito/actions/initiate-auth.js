
const  {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
  } = require("@aws-sdk/client-cognito-identity-provider");
  
  /** snippet-start:[javascript.v3.cognito-idp.actions.InitiateAuth] */
  const initiateAuth = ({ username, password, clientId }) => {
    const client = new CognitoIdentityProviderClient({});
  
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      ClientId: clientId,
    });
  
    return client.send(command);
  };
  /** snippet-end:[javascript.v3.cognito-idp.actions.InitiateAuth] */
  
  module.exports = initiateAuth;