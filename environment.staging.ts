export const environment = {
  idealModalWidth: window.innerWidth > 768 ? '40vw' : '70vw',
  ssoUrl: 'https://sso-staging-frontend.secureid-digital.com.ng',
  appDetails: {
    ClientId: 'D2D_Staging',
    ClientSecret:
      '/01l5Mf2d3+u2yI7vjwiVBSb3AIUiI1GBYNmUfPGJUJ3ocRI4aTHSSLZd3xvLwjp',
    GrantType: 'client_credentials',
  },
  baseAPI: 'https://d2d-staging-api.secureid-digital.com.ng/api',
  ssoBaseAPI: 'https://sso-staging-idserver.secureid-digital.com.ng/api',
  version: 'v1.0.0',
};
