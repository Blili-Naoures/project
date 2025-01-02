```java
package com.example.recipeapp.db;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import com.example.recipeapp.model.Recipe;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import java.util.List;

public class DatabaseHelper extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "recipes.db";
    private static final int DATABASE_VERSION = 1;
    private static final String TABLE_RECIPES = "recipes";
    private final Gson gson = new Gson();

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String CREATE_RECIPES_TABLE = "CREATE TABLE " + TABLE_RECIPES + "("
                + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
                + "name TEXT NOT NULL,"
                + "description TEXT,"
                + "ingredients TEXT NOT NULL,"
                + "instructions TEXT NOT NULL,"
                + "category TEXT NOT NULL,"
                + "isFavorite INTEGER DEFAULT 0,"
                + "imageUrl TEXT"
                + ")";
        db.execSQL(CREATE_RECIPES_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_RECIPES);
        onCreate(db);
    }

    public long addRecipe(Recipe recipe) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        
        values.put("name", recipe.getName());
        values.put("description", recipe.getDescription());
        values.put("ingredients", gson.toJson(recipe.getIngredients()));
        values.put("instructions", recipe.getInstructions());
        values.put("category", recipe.getCategory());
        values.put("isFavorite", recipe.isFavorite() ? 1 : 0);
        values.put("imageUrl", recipe.getImageUrl());

        long id = db.insert(TABLE_RECIPES, null, values);
        db.close();
        return id;
    }

    public List<Recipe> getAllRecipes() {
        List<Recipe> recipes = new ArrayList<>();
        String selectQuery = "SELECT * FROM " + TABLE_RECIPES;
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery(selectQuery, null);

        if (cursor.moveToFirst()) {
            do {
                Recipe recipe = new Recipe();
                recipe.setId(cursor.getLong(0));
                recipe.setName(cursor.getString(1));
                recipe.setDescription(cursor.getString(2));
                recipe.setIngredients(gson.fromJson(cursor.getString(3), 
                    new TypeToken<List<String>>(){}.getType()));
                recipe.setInstructions(cursor.getString(4));
                recipe.setCategory(cursor.getString(5));
                recipe.setFavorite(cursor.getInt(6) == 1);
                recipe.setImageUrl(cursor.getString(7));
                recipes.add(recipe);
            } while (cursor.moveToNext());
        }
        cursor.close();
        db.close();
        return recipes;
    }

    public List<Recipe> getFavoriteRecipes() {
        List<Recipe> recipes = new ArrayList<>();
        String selectQuery = "SELECT * FROM " + TABLE_RECIPES + " WHERE isFavorite = 1";
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery(selectQuery, null);

        if (cursor.moveToFirst()) {
            do {
                Recipe recipe = new Recipe();
                recipe.setId(cursor.getLong(0));
                recipe.setName(cursor.getString(1));
                recipe.setDescription(cursor.getString(2));
                recipe.setIngredients(gson.fromJson(cursor.getString(3), 
                    new TypeToken<List<String>>(){}.getType()));
                recipe.setInstructions(cursor.getString(4));
                recipe.setCategory(cursor.getString(5));
                recipe.setFavorite(true);
                recipe.setImageUrl(cursor.getString(7));
                recipes.add(recipe);
            } while (cursor.moveToNext());
        }
        cursor.close();
        db.close();
        return recipes;
    }
}
```