// user.model.ts
import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  phone: string;
}
