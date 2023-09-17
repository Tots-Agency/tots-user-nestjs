
import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';


@Table({
    tableName: 'tots_user',
    timestamps: true,
})
export class TotsUser extends Model {

  static STATUS_INACTIVE = 0;
  static STATUS_ACTIVE = 1;
  static STATUS_SUSPENDED = 2;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  photo: string;

  @Column
  phone: string;

  @Column
  role: number;

  @Column
  status: number;

  @Column
  is_notification: number;

  @Column
  caption: string;

  @Column
  timezone: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}