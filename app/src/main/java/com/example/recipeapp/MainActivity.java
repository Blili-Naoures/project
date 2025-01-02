```java
package com.example.recipeapp;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.recipeapp.adapter.RecipeAdapter;
import com.example.recipeapp.db.DatabaseHelper;
import com.example.recipeapp.model.Recipe;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import java.util.List;

public class MainActivity extends AppCompatActivity implements RecipeAdapter.OnRecipeClickListener {
    private DatabaseHelper dbHelper;
    private RecipeAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dbHelper = new DatabaseHelper(this);
        setupRecyclerView();
        setupFab();
    }

    private void setupRecyclerView() {
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        
        List<Recipe> recipes = dbHelper.getAllRecipes();
        adapter = new RecipeAdapter(recipes, this);
        recyclerView.setAdapter(adapter);
    }

    private void setupFab() {
        FloatingActionButton fab = findViewById(R.id.fabAddRecipe);
        fab.setOnClickListener(view -> {
            // TODO: Ouvrir l'activité d'ajout de recette
        });
    }

    @Override
    public void onRecipeClick(Recipe recipe) {
        // TODO: Ouvrir l'activité de détail de la recette
    }
}
```