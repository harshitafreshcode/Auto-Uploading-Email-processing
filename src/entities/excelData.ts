// @ManyToMany(() => Friend)
//   @JoinTable({
//     name: 'user_friend',
//     joinColumn: { name: 'user_id', referencedColumnName: 'id' },
//     inverseJoinColumn: { name: 'friend_id', referencedColumnName: 'id' },
//   })
//   friends: Friend[];


import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, OneToOne, JoinColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable, BeforeInsert } from "typeorm"
const bcrypt = require('bcrypt');

@Entity({ name: "excel_data" })
export class ExcelData {
    @PrimaryGeneratedColumn('increment')
    'id': number

    @Column()
    'name': string

    @Column()
    'year_of_experience': number

    @Column({ unique: true })
    'email': string

    @Column({ default: 1 })
    'status': number

    @CreateDateColumn({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    'created_date': Date

    @UpdateDateColumn({ name: 'updated_date' })
    'updated_date': Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    "deleted_at": Date


}