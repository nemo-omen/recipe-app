import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe')
export default class Recipe {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  servings?: number;

  @Column()
  prepTime?: number;

  @Column()
  cookTime?: number;

  @Column()
  instructions?: string;

  @Column()
  photoUrl?: string;
}
