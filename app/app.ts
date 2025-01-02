import { Application } from '@nativescript/core';
import { databaseService } from './services/database.service';

databaseService.init()
    .then(() => {
        Application.run({ moduleName: 'app-root' });
    })
    .catch(error => {
        console.error('Database initialization failed:', error);
    });