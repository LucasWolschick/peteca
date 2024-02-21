const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
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
            imagem: "url_da_imagem"}
    });

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

    await prisma.token.create({
        data:{
            userId: 5
        }
    });

    await prisma.token.create({
        data:{
            userId: 7
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 1,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 1,
            permissaoId: 3
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 1,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 1,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 1,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 2,
            permissaoId: 1
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 2,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 2,
            permissaoId: 3
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 2,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 2,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 2,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 2,
            permissaoId: 7
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 3,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 3,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 3,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 3,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 4,
            permissaoId: 1
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 4,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 4,
            permissaoId: 3
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 4,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 4,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 4,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 5,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 5,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 5,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 5,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 6,
            permissaoId: 1
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 6,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 6,
            permissaoId: 3
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 6,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 6,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 6,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 7,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 7,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 7,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 7,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 8,
            permissaoId: 1
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 8,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 8,
            permissaoId: 3
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 8,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 8,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 8,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 9,
            permissaoId: 1
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 9,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 9,
            permissaoId: 3
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 9,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 9,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 9,
            permissaoId: 6
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 10,
            permissaoId: 2
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 10,
            permissaoId: 4
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 10,
            permissaoId: 5
        }
    });

    await prisma.userPermissoes.create({
        data:{
            userId: 10,
            permissaoId: 6
        }
    });
})();