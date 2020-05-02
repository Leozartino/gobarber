import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// No caso de classes, por já esta declarado os atributos
// não é necessário criar uma interface para extrair de um objeto especifico
// mas sim, só usar a sintaxe de desestruturação e falar quais atributos
// serão omitidos.

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // por padrao varchar
  provider: string;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
