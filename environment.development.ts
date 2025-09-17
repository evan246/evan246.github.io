export const environment = {
  idealModalWidth: window.innerWidth > 768 ? '40vw' : '70vw',
  ssoUrl: 'https://sso-dev-frontend.secureid-digital.com.ng',
  appDetails: {
    ClientId: 'DoorToDoor_API',
    ClientSecret:
      'IbE4G3P3vaFgxFD7RGKpmiA/Nlv10el+LIcnSBJu4PlQasWt7MPVcVTNMbEFSFtU',
    GrantType: 'client_credentials',
  },
  baseAPI: 'https://d2d-dev-backend.getsnapii.com/api',
  ssoBaseAPI: 'https://sso-idserver-dev.secureid-digital.com.ng/api',
  version: 'v1.0.0',
};
