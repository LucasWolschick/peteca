// Aqui preciso fazer o cadastro de usuario no Peteca
// O usuario deve preencher os seguintes dados:
//Nome
// data de nascimento
// email
// ra
// matricula
// permissoes
// senha
// E uma foto do usuario

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({type: "date" })
    dataNascimento: Date
}