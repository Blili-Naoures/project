import { NavigatedData, Page } from '@nativescript/core';
import { RecipeDetailViewModel } from './recipe-detail-view-model';
import { Recipe } from '../../../models/recipe.model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const recipe = args.context as Recipe;
    page.bindingContext = new RecipeDetailViewModel(recipe);
}