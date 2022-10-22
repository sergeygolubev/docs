import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NameForm from './form';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Tabs>
    <TabList>
      <Tab>Сводная таблица</Tab>
      <Tab>Форма для заявки</Tab>
    </TabList>

    <TabPanel>
      <App />
    </TabPanel>
    <TabPanel>
      <NameForm />
    </TabPanel>
  </Tabs>







  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
