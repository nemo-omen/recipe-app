import db from './db.js';

export class RecipeService {
  static async getAll() {
    const recipeResponse = await db.from('recipes').select();
    console.log('recipeResponse: ', recipeResponse);
  }
}
