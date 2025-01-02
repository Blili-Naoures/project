import { EventData, NavigatedData, Page } from '@nativescript/core';
import { RecipesListViewModel } from './recipes-list-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new RecipesListViewModel();
}