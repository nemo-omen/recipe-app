import { createConnection, Connection } from 'typeorm';
import path from 'path';
import { defaultStorageFolder } from '../index.ts';
import Recipe from './models/Recipe.ts';

export default class Database {
  private connection: Connection;

  constructor() {
    this.init();
  }

  public async init() {
    this.connection = await createConnection({
      type: 'sqlite',
      database: path.join(defaultStorageFolder, 'kw.sqlite'),
      entities: [Recipe],
    });

    if (this.connection.isConnected) {
      this.connection.synchronize();
    }
  }

  public async getAll(): Promise<Recipe[]> {
    const recipeRepository = this.connection.getRepository(Recipe);

    return recipeRepository.find();
  }
}
