import React from 'react';
import ReactDOM from 'react-dom';
import CronContainer from './components/task/cron_container.js';

var cronContainer = document.getElementById('cron-container');
if (cronContainer) {
    ReactDOM.render(
        <CronContainer />,
        cronContainer
    );
}
