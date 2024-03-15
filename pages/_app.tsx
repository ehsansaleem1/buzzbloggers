import '../styles/globals.css'
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  let origin;
  if (typeof window!=="undefined") {
    origin = window.location.origin;
  }
  return( 
    <Auth0Provider
        domain="dev-n83sckv1u768rsp5.us.auth0.com"
        clientId="Yd8Xi7ysWPRt1AxOZovfxDlLo3JYfdbJ"
        authorizationParams={{
          redirect_uri: origin? origin : ""
        }}
      >
      <Head>
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">  
          </script>
      </Head>
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
