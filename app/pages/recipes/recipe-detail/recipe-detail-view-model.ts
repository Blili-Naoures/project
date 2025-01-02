import { Observable } from '@nativescript/core';
import { Recipe } from '../../../models/recipe.model';
import { databaseService } from '../../../services/database.service';

export class RecipeDetailViewModel extends Observable {
    private recipe: Recipe;

    constructor(recipe: Recipe) {
        super();
        this.recipe = recipe;
    }

    get name(): string { return this.recipe.name; }
    get description(): string { return this.recipe.description; }
    get category(): string { return this.recipe.category; }
    get ingredients(): string[] { return this.recipe.ingredients; }
    get instructions(): string { return this.recipe.instructions; }
    get isFavorite(): boolean { return this.recipe.isFavorite; }

    async toggleFavorite(): Promise<void> {
        try {
            this.recipe.isFavorite = !this.recipe.isFavorite;
            await databaseService.updateRecipe(this.recipe);
            this.notifyPropertyChange('isFavorite', this.recipe.isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }
}