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
              "#f2f9fd",
              "#e3f0fb",
              "#c1e2f6",
              "#8bcaee",
              "#4caee4",
              "#2594d2",
              "#1981c2",
              "#145e90",
              "#145178",
              "#164464",
              "#0f2c42"
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
