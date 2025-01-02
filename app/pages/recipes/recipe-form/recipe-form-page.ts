import { NavigatedData, Page } from '@nativescript/core';
import { RecipeFormViewModel } from './recipe-form-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new RecipeFormViewModel();
}