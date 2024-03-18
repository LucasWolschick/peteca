import { TipoMovimentacaoItem } from "@prisma/client";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async () => {
  await prisma.permissoes.create({
    data: {
      nome: "Gerir Cadastros",
    },
  });

  await prisma.permissoes.create({
    data: {
      nome: "Gerir Estoque",
    },
  });

  await prisma.permissoes.create({
    data: {
      nome: "Gerir Caixinha",
    },
  });

  await prisma.permissoes.create({
    data: {
      nome: "Gerir Documentos",
    },
  });

  await prisma.permissoes.create({
    data: {
      nome: "Visualizar Caixinha",
    },
  });

  await prisma.permissoes.create({
    data: {
      nome: "Visualizar Documentos",
    },
  });

  await prisma.permissoes.create({
    data: {
      nome: "Visualizar Registros",
    },
  });

  await prisma.permissoes.create({
    data: {
      nome: "admin",
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2023-09-15"),
      nome: "João Silva",
      ra: "ra123456",
      email: "joao.silva@example.com",
      verificado: true,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: false,
      data_nascimento: new Date("2000-05-20"),
      imagem: "url_da_imagem",
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 3,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2023-08-20"),
      nome: "Maria Oliveira",
      matricula: "098765",
      email: "maria.oliveira@example.com",
      verificado: true,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: false,
      data_nascimento: new Date("1998-10-10"),
      imagem: "url_da_imagem",
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 1,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 3,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 7,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2022-12-01"),
      nome: "Carlos Santos",
      ra: "ra987654",
      email: "carlos.santos@example.com",
      verificado: true,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: false,
      data_nascimento: new Date("2001-03-15"),
      imagem: "url_da_imagem",
      ativo: false,
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2023-01-05"),
      nome: "Ana Lima",
      matricula: "135790",
      email: "ana.lima@example.com",
      verificado: true,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: false,
      data_nascimento: new Date("1999-07-25"),
      imagem: "url_da_imagem",
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 1,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 3,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2023-03-10"),
      nome: "Pedro Costa",
      ra: "ra112233",
      email: "pedro.costa@example.com",
      verificado: false,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: false,
      data_nascimento: new Date("2002-01-30"),
      imagem: "url_da_imagem",
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2022-06-18"),
      nome: "Juliana Pereira",
      matricula: "665544",
      email: "juliana.pereira@example.com",
      verificado: true,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: false,
      data_nascimento: new Date("2003-09-05"),
      imagem: "url_da_imagem",
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 1,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 3,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2022-10-30"),
      nome: "Fernando Souza",
      ra: "ra554433",
      email: "fernando.souza@example.com",
      verificado: false,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: false,
      data_nascimento: new Date("2000-12-12"),
      imagem: "url_da_imagem",
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2023-04-25"),
      nome: "Camila Rodrigues",
      matricula: "667788",
      email: "camila.rodrigues@example.com",
      verificado: true,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: false,
      data_nascimento: new Date("2001-08-20"),
      imagem: "url_da_imagem",
      ativo: false,
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 1,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 3,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2022-08-05"),
      nome: "Rafaela Nunes",
      matricula: "443322",
      email: "rafaela.nunes@example.com",
      verificado: true,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: true,
      data_nascimento: new Date("1998-04-02"),
      imagem: "url_da_imagem",
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 1,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 3,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      ingresso: new Date("2023-02-14"),
      nome: "Gabriel Oliveira",
      ra: "ra334466",
      email: "gabriel.oliveira@example.com",
      verificado: true,
      senha: "$2b$10$4g4PDQtahvBjsxw7QpCWD.y2ZWJVTWdWxaXnyYRMO59MUbBhEVXsS",
      senha_removida: true,
      data_nascimento: new Date("2002-11-18"),
      imagem: "url_da_imagem",
      ativo: false,
      permissoes: {
        create: [
          {
            permissao: {
              connect: {
                id: 2,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 4,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 5,
              },
            },
          },
          {
            permissao: {
              connect: {
                id: 6,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.item.create({
    data: {
      nome: "Canetão",
      quantidade: 20,
      unidadeMedida: "UN",
      local: "Armário do Puff",
    },
  });

  await prisma.item.create({
    data: {
      nome: "Apagador",
      quantidade: 3,
      unidadeMedida: "UN",
      local: "Quadro",
    },
  });

  await prisma.item.create({
    data: {
      nome: "Resma de Papel",
      quantidade: 10,
      unidadeMedida: "UN",
      local: "Armário dos Livros",
    },
  });

  await prisma.item.create({
    data: {
      nome: "Tesoura",
      quantidade: 3,
      unidadeMedida: "UN",
      local: "Armário do Puff",
    },
  });

  await prisma.item.create({
    data: {
      nome: "Patolino",
      quantidade: 1,
      unidadeMedida: "UN",
      local: "Armario de Livros",
    },
  });

  await prisma.item.create({
    data: {
      nome: "Panos",
      quantidade: 20,
      unidadeMedida: "UN",
      local: "Caixas organizadoras",
    },
  });

  await prisma.movimentacaoItem.create({
    data: {
      data: new Date("2023-09-15"),
      tipo: TipoMovimentacaoItem.CRIADO,
      novaQuantidade: 10,
      novoNome: "wow",
      novoLocal: "o que",
      novaUnidadeMedida: "kg",
      item: {
        connect: {
          id: 1,
        },
      },
      autor: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.movimentacaoItem.create({
    data: {
      data: new Date("2023-09-15"),
      tipo: TipoMovimentacaoItem.ALTERADO,
      antigaQuantidade: 10,
      novaQuantidade: 3,
      item: {
        connect: {
          id: 2,
        },
      },
      autor: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.movimentacaoItem.create({
    data: {
      data: new Date("2023-09-15"),
      tipo: TipoMovimentacaoItem.REMOVIDO,
      antigaQuantidade: 3,
      antigoNome: "Apagador",
      antigoLocal: "Quadro",
      antigaUnidadeMedida: "UN",
      item: {
        connect: {
          id: 3,
        },
      },
      autor: {
        connect: {
          id: 1,
        },
      },
    },
  });
})();

console.log("Terminou!");
