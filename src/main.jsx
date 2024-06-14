import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css';
import './index.css'
import '@mantine/notifications/styles.css';
// import '@mantine/dates/styles.css';
// import '@mantine/nprogress/styles.css';
import { RecoilRoot } from 'recoil'
import { Anchor, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider
        theme={{
          colors: {
            brand: [
              '#F0BBDD',
              '#ED9BCF',
              '#EC7CC3',
              '#ED5DB8',
              '#F13EAF',
              '#F71FA7',
              '#518DC8',
              '#3F91F6',
              '#518DC8',
              '#C50E82',
              '#AD1374',
            ],
          },
          primaryColor: 'brand',
          components: {
            Anchor: Anchor.extend({
              defaultProps: {
                underline: 'never',
              },
            }),
          },
        }}>
        <Notifications />
        <App />
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
