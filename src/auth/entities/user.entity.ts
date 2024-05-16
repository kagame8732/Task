import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Column({ type: String })
  firstName: string;

  @Column({ type: String })
  lastName: string;
}
