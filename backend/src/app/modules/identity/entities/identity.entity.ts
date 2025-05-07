import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  //   OneToMany
} from 'typeorm';

// {
//     id: 'dbrucknr',
//     displayName: 'Derek Bruckner',
//     name: {
//       familyName: 'Bruckner',
//       givenName: 'Derek'
//     },
//     emails: [
//       {
//         value: 'dbrucknr@umich.edu'
//       }
//     ]
// }

// {
//   "id": "dbrucknr",
//   "email": "dbrucknr@umich.edu",
//   "password": "change-me"
// }

@Entity()
export class Identity {
  @PrimaryGeneratedColumn() // Should this be made as the uniqname?
  id: number;

  @Column({ unique: true })
  uniqname: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
