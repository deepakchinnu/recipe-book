import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService{
    recipedChanged = new Subject<Recipe[]>()

    // private recipes: Recipe[] = [
    //     new Recipe('Biryani', 
    //     'This is the best biryani', 
    //     'http://nomadette.com/wp-content/uploads/2022/04/One-Pan-Chicken-Briyani.jpg',
    //     [
    //         new Ingredient('Chicken',1),
    //         new Ingredient('Mutton',2)
    //     ]),
    //     new Recipe('Pizza', 
    //     'Cheeeeeeeeeeeeeeesy', 
    //     'https://media-cdn.tripadvisor.com/media/photo-s/19/1e/1a/3a/pizza-hut.jpg',
    //     [
    //         new Ingredient('Wheat',1),
    //         new Ingredient('Bread',2)
    //     ])
    //   ];
    private recipes: Recipe[]=[]
    
    constructor(private slService: ShoppingListService){}  

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipedChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipedChanged.next(this.recipes.slice())
    }
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipedChanged.next(this.recipes.slice())
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipedChanged.next(this.recipes.slice())
    }
}
