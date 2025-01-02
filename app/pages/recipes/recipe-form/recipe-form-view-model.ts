import { Observable } from '@nativescript/core';
import { databaseService } from '../../../services/database.service';
import { Recipe } from '../../../models/recipe.model';
import { NavigationService } from '../../../navigation/navigation.service';

export class RecipeFormViewModel extends Observable {
    private _name = '';
    private _description = '';
    private _category = '';
    private _ingredientsText = '';
    private _instructions = '';

    constructor() {
        super();
    }

    get name(): string { return this._name; }
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange('name', value);
        }
    }

    get description(): string { return this._description; }
    set description(value: string) {
        if (this._description !== value) {
            this._description = value;
            this.notifyPropertyChange('description', value);
        }
    }

    get category(): string { return this._category; }
    set category(value: string) {
        if (this._category !== value) {
            this._category = value;
            this.notifyPropertyChange('category', value);
        }
    }

    get ingredientsText(): string { return this._ingredientsText; }
    set ingredientsText(value: string) {
        if (this._ingredientsText !== value) {
            this._ingredientsText = value;
            this.notifyPropertyChange('ingredientsText', value);
        }
    }

    get instructions(): string { return this._instructions; }
    set instructions(value: string) {
        if (this._instructions !== value) {
            this._instructions = value;
            this.notifyPropertyChange('instructions', value);
        }
    }

    async onSave(): Promise<void> {
        try {
            const recipe: Recipe = {
                name: this.name,
                description: this.description,
                category: this.category,
                ingredients: this.ingredientsText.split('\n').filter(i => i.trim()),
                instructions: this.instructions,
                isFavorite: false
            };

            await databaseService.addRecipe(recipe);
            NavigationService.goBack();
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    }
}