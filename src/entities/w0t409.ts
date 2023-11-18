import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, OneToOne, JoinColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable, BeforeInsert } from "typeorm"
const bcrypt = require('bcrypt');

@Entity({ name: "import_dbf" })
export class Import_dbf {
    @PrimaryGeneratedColumn('increment')
    'id': number

    @Column()
    'prcode': string

    @Column({ type: 'bigint' })
    'pin': string

    @Column({ type: 'bigint' })
    'acno': string

    @Column()
    'funddesc': string

    // @Column()
    // 'funddesc': string

    // @Column()
    // 'td_purred': string

    // @Column()
    // 'TD_TRNO,N,10,0': string

    // @Column()
    // 'SMCODE,N,10,0': string

    // @Column()
    // 'CHQNO,C,20': string

    // @Column()
    // 'INVNAME,C,80': string

    // @Column()
    // 'TRNMODE': string
    // @Column()
    // 'TRNSTAT,C,1': string
    // @Column()
    // 'TD_BRANCH,C,50': string

    // @Column()
    // 'ISCTRNO,N,10,0': string
    // @Column()
    // 'TD_TRDT,D': string
    // @Column()
    // 'TD_PRDT,D': string
    // @Column()
    // 'TD_POP,C,30': string
    // @Column()
    // 'TD_UNITS,N,20,3': string
    // @Column()
    // 'TD_AMT,N,20,2': string
    // @Column()
    // 'TD_AGENT,C,20': string
    // @Column()
    // 'TD_AGENT': string

    // @Column()
    // 'TD_BROKER,C,20': string

    // @Column()
    // 'BROKPER,N,10,0': string

    // @Column()
    // 'BROKCOMM,N,10,0': string

    // @Column()
    // 'INVID,C,1': string

    // @Column()
    // 'CRDATE,D': string


    // @Column({ default: 1 })
    // 'status': number

    @CreateDateColumn({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    'created_date': Date

    @UpdateDateColumn({ name: 'updated_date' })
    'updated_date': Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    "deleted_at": Date


}