import { Frame } from '@nativescript/core';
import { Recipe } from '../models/recipe.model';

export class NavigationService {
    static navigateToRecipeForm(): void {
        Frame.topmost().navigate({
            moduleName: 'pages/recipes/recipe-form/recipe-form-page'
        });
    }

    static navigateToRecipeDetail(recipe: Recipe): void {
        Frame.topmost().navigate({
            moduleName: 'pages/recipes/recipe-detail/recipe-detail-page',
            context: recipe
        });
    }

    static goBack(): void {
        Frame.topmost().goBack();
    }
}