import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { Subject } from 'rxjs';

export class IngredientsService {
    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Apple', 3)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }
    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(auxIngredients: Ingredient[]) {
        for (const i of auxIngredients) {
            const exist = this.ingredients.find(x => x.name === i.name);
            if (exist) {
                const acum = exist.amount += i.amount;
            } else {
                this.ingredients.push(i);
            }
        }
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    onDelete(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
