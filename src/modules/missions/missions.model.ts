import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { MissionStatus } from './missions.enum';

@Table({
  tableName: 'missions',
  timestamps: true,
})
export class Mission extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare organization_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare points: number;

  @Column({
    type: DataType.ENUM(...Object.values(MissionStatus)),
    defaultValue: MissionStatus.AVAILABLE,
  })
  declare status: MissionStatus;
}
