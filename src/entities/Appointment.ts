import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    providerId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'providerId' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @UpdateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // constructor({ provider, date }: Omit<Appointment, 'id'>) {
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;
    // }
}
export default Appointment;
