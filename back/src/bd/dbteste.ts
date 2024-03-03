const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {

    await prisma.permissoes.create({
        data:{
            nome: "Gerir Cadastros"
        }
    });

    await prisma.permissoes.create({
        data:{
            nome: "Gerir Estoque"
        }
    });

    await prisma.permissoes.create({
        data:{
            nome: "Gerir Caixinha"
        }
    });

    await prisma.permissoes.create({
        data:{
            nome: "Gerir Documentos"
        }
    });

    await prisma.permissoes.create({
        data:{
            nome: "Visualizar Caixinha"
        }
    });

    await prisma.permissoes.create({
        data:{
            nome: "Visualizar Documentos"
        }
    });

    await prisma.permissoes.create({
        data:{
            nome: "Visualizar Registros"
        }
    });

    await prisma.user.create({
        data:{
            ingresso: new Date('2023-09-15'),
            nome: "João Silva",
            ra: "ra123456",
            email: "joao.silva@example.com",
            verificado: true,
            senha: "hashedpassword123",
            admin: false,
            data_nascimento: new Date('2000-05-20'),
            imagem: "url_da_imagem",
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 3
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                }
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2023-08-20'),
            nome: "Maria Oliveira",
            matricula: "098765",
            email: "maria.oliveira@example.com",
            verificado: true,
            senha: "hashedpassword456",
            admin: true,
            data_nascimento: new Date('1998-10-10'),
            imagem: "url_da_imagem",
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 1
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 3
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 7
                        }
                    }
                }
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2022-12-01'),
            nome: "Carlos Santos",
            ra: "ra987654",
            email: "carlos.santos@example.com",
            verificado: true,
            senha: "hashedpassword789",
            admin: false,
            data_nascimento: new Date('2001-03-15'),
            imagem: "url_da_imagem",
            ativo: false,
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                }
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2023-01-05'),
            nome: "Ana Lima",
            matricula: "135790",
            email: "ana.lima@example.com",
            verificado: true,
            senha: "hashedpasswordABC",
            admin: false,
            data_nascimento: new Date('1999-07-25'),
            imagem: "url_da_imagem",
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 1
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 3
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                }
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2023-03-10'),
            nome: "Pedro Costa",
            ra: "ra112233",
            email: "pedro.costa@example.com",
            verificado: false,
            senha: "hashedpasswordDEF",
            admin: false,
            data_nascimento: new Date('2002-01-30'),
            imagem: "url_da_imagem",
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                },
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2022-06-18'),
            nome: "Juliana Pereira",
            matricula: "665544",
            email: "juliana.pereira@example.com",
            verificado: true,
            senha: "hashedpasswordGHI",
            admin: false,
            data_nascimento: new Date('2003-09-05'),
            imagem: "url_da_imagem",
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 1
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 3
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                },
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2022-10-30'),
            nome: "Fernando Souza",
            ra: "ra554433",
            email: "fernando.souza@example.com",
            verificado: false,
            senha: "hashedpasswordJKL",
            admin: false,
            data_nascimento: new Date('2000-12-12'),
            imagem: "url_da_imagem",
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                },
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2023-04-25'),
            nome: "Camila Rodrigues",
            matricula: "667788",
            email: "camila.rodrigues@example.com",
            verificado: true,
            senha: "hashedpasswordMNO",
            admin: false,
            data_nascimento: new Date('2001-08-20'),
            imagem: "url_da_imagem",
            ativo: false,
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 1
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 3
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                },
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2022-08-05'),
            nome: "Rafaela Nunes",
            matricula: "443322",
            email: "rafaela.nunes@example.com",
            verificado: true,
            senha: "hashedpasswordPQR",
            admin: false,
            data_nascimento: new Date('1998-04-02'),
            imagem: "url_da_imagem",
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 1
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 3
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                },
            ],
            },
        }
        });
        
    await prisma.user.create({
        data:{
            ingresso: new Date('2023-02-14'),
            nome: "Gabriel Oliveira",
            ra: "ra334466",
            email: "gabriel.oliveira@example.com",
            verificado: true,
            senha: "hashedpasswordSTU",
            admin: false,
            data_nascimento: new Date('2002-11-18'),
            imagem: "url_da_imagem",
            ativo: false,
            permissoes:{
                create:[{
                    permissao:{
                        connect:{
                            id: 2
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 4
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 5
                        }
                    }
                },
                {
                    permissao:{
                        connect:{
                            id: 6
                        }
                    }
                },
            ],
            },
        }
    });

    await prisma.item.create({
        data:{
            nome: "Canetão",
            quantidade: 20,
            unidadeMedida: "UN",
            local: "Armário do Puff",

        }
    })

    await prisma.item.create({
        data:{
            nome: "Apagador",
            quantidade: 3,
            unidadeMedida: "UN",
            local: "Quadro",
        }
    })

    await prisma.item.create({
        data:{
            nome: "Resma de Papel",
            quantidade: 10,
            unidadeMedida: "UN",
            local: "Armário dos Livros",
        }
    })

    await prisma.item.create({
        data:{
            nome: "Tesoura",
            quantidade: 3,
            unidadeMedida: "UN",
            local: "Armário do Puff",
            campos:{
                create:[
                    {
                        nome: "Instruções de Uso",
                        texto: "Usar e guardar com cuidado"
                    },
                ],
            },
        },
    })

    await prisma.item.create({
        data:{
            nome: "Patolino",
            quantidade: 1,
            unidadeMedida: "UN",
            local: "Armario de Livros",
            campos:{
                create:[
                    {
                        nome: "Data de recebimento",
                        data: new Date("1998-02-03"),
                    },
                ],
            },
        },
    })

    await prisma.item.create({
        data:{
            nome: "Panos",
            quantidade: 20,
            unidadeMedida: "UN",
            local: "Caixas organizadoras",
            campos:{
                create:[
                    {
                        nome: "Quantidade de usos restantes",
                        numero: 10,
                    },
                    {
                        nome: "Instruções de Uso",
                        texto: "Lavar após utilizar",
                    },
                ],
            },
        },
    })

})();

console.log("Terminou!")