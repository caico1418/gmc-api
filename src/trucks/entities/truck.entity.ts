import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Truck {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar' })
    brand?: string;

    @Column({ type: 'varchar', unique: true })
    model?: string;

    @Column({ type: 'varchar' })
    description?: string;

    @Column({ type: 'int' })
    price?: number;
}
