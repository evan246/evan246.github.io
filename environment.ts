export const environment = {
  idealModalWidth: window.innerWidth > 768 ? '40vw' : '70vw',
  ssoUrl: 'https://sso-dev-frontend.secureid-digital.com.ng',
  appDetails: {
    ClientId: 'DoorToDoor_API',
    ClientSecret:
      '/01l5Mf2d3+u2yI7vjwiVBSb3AIUiI1GBYNmUfPGJUJ3ocRI4aTHSSLZd3xvLwjp',
    GrantType: 'client_credentials',
  },
  baseAPI: 'https://d2d-api.getsnapii.com/api',
  ssoBaseAPI: 'https://prod-sso-idserver.getsecureauth.com/api',
  version: 'v1.0.0',
};
