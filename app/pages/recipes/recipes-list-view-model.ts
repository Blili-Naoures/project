import { Observable, EventData } from '@nativescript/core';
import { Button } from '@nativescript/core';
import { databaseService } from '../../services/database.service';
import { NavigationService } from '../../navigation/navigation.service';
import { Recipe } from '../../models/recipe.model';

export class RecipesListViewModel extends Observable {
    private _recipes: Recipe[] = [];
    private _searchQuery: string = '';

    constructor() {
        super();
        this.loadRecipes().catch(error => {
            console.error('Error initializing recipes:', error);
        });
    }

    get recipes(): Recipe[] {
        return this._recipes;
    }

    set recipes(value: Recipe[]) {
        if (this._recipes !== value) {
            this._recipes = value;
            this.notifyPropertyChange('recipes', value);
        }
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
            this.filterRecipes();
        }
    }

    async loadRecipes(): Promise<void> {
        try {
            const recipes = await databaseService.getRecipes();
            this.recipes = recipes;
        } catch (error) {
            console.error('Error loading recipes:', error);
            this.recipes = [];
        }
    }

    async showFavorites(): Promise<void> {
        try {
            const favorites = await databaseService.getFavoriteRecipes();
            this.recipes = favorites;
        } catch (error) {
            console.error('Error loading favorite recipes:', error);
            this.recipes = [];
        }
    }

    async filterByCategory(args: EventData): Promise<void> {
        try {
            const button = args.object as Button;
            if (!button || !button.text) return;

            if (button.text === 'Tous') {
                await this.loadRecipes();
            } else {
                const recipes = await databaseService.getRecipesByCategory(button.text);
                this.recipes = recipes;
            }
        } catch (error) {
            console.error('Error filtering recipes:', error);
            this.recipes = [];
        }
    }

    onAddRecipe(): void {
        NavigationService.navigateToRecipeForm();
    }

    onRecipeTap(args: { index: number }): void {
        const recipe = this.recipes[args.index];
        if (recipe) {
            NavigationService.navigateToRecipeDetail(recipe);
        }
    }

    private filterRecipes(): void {
        if (!this._searchQuery) {
            this.loadRecipes().catch(error => {
                console.error('Error reloading recipes:', error);
            });
            return;
        }

        const query = this._searchQuery.toLowerCase();
        const filteredRecipes = this._recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query) ||
            recipe.category.toLowerCase().includes(query) ||
            recipe.ingredients.some(i => i.toLowerCase().includes(query))
        );
        this.recipes = filteredRecipes;
    }
}