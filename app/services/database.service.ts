import { Sqlite } from 'nativescript-sqlite';
import { Recipe } from '../models/recipe.model';

export class DatabaseService {
    private database: Sqlite;

    public async init(): Promise<void> {
        this.database = await new Sqlite('recipes.db');
        await this.createTables();
    }

    private async createTables(): Promise<void> {
        await this.database.execSQL(`
            CREATE TABLE IF NOT EXISTS recipes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                ingredients TEXT NOT NULL,
                instructions TEXT NOT NULL,
                category TEXT NOT NULL,
                isFavorite INTEGER DEFAULT 0,
                imageUrl TEXT
            )
        `);
    }

    public async addRecipe(recipe: Recipe): Promise<number> {
        const result = await this.database.execSQL(
            `INSERT INTO recipes (name, description, ingredients, instructions, category, isFavorite, imageUrl)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [recipe.name, recipe.description, JSON.stringify(recipe.ingredients),
             recipe.instructions, recipe.category, recipe.isFavorite ? 1 : 0, recipe.imageUrl]
        );
        return result.insertId;
    }

    public async updateRecipe(recipe: Recipe): Promise<void> {
        await this.database.execSQL(
            `UPDATE recipes 
             SET name = ?, description = ?, ingredients = ?, instructions = ?,
                 category = ?, isFavorite = ?, imageUrl = ?
             WHERE id = ?`,
            [recipe.name, recipe.description, JSON.stringify(recipe.ingredients),
             recipe.instructions, recipe.category, recipe.isFavorite ? 1 : 0,
             recipe.imageUrl, recipe.id]
        );
    }

    public async getRecipes(): Promise<Recipe[]> {
        const rows = await this.database.all('SELECT * FROM recipes');
        return this.mapRowsToRecipes(rows);
    }

    public async getFavoriteRecipes(): Promise<Recipe[]> {
        const rows = await this.database.all('SELECT * FROM recipes WHERE isFavorite = 1');
        return this.mapRowsToRecipes(rows);
    }

    public async getRecipesByCategory(category: string): Promise<Recipe[]> {
        const rows = await this.database.all('SELECT * FROM recipes WHERE category = ?', [category]);
        return this.mapRowsToRecipes(rows);
    }

    private mapRowsToRecipes(rows: any[]): Recipe[] {
        return rows.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            ingredients: JSON.parse(row.ingredients),
            instructions: row.instructions,
            category: row.category,
            isFavorite: Boolean(row.isFavorite),
            imageUrl: row.imageUrl
        }));
    }
}

export const databaseService = new DatabaseService();