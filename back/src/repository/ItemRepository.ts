import { PrismaClient } from "@prisma/client";

class ItemRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createItem(nome: string, quantidade: number, unidadeMedida: string, local: string) {
        return this.prisma.item.create({
            data: {
                nome,
                quantidade,
                unidadeMedida,
                local
            }
        })
    }

    async getItems() {
        return this.prisma.item.findMany();
    }

    async updateItems(itemsToUpdate: { id: number; nome?: string; quantidade?: number; unidadeMedida?: string; local?: string}[]) {
        const updatePromises = itemsToUpdate.map(item => {
            return this.prisma.item.update({
                where: {id: item.id},
                data: {
                    nome: item.nome,
                    quantidade: item.quantidade,
                    unidadeMedida: item.unidadeMedida,
                    local: item.local
                }
            })
        })

        return Promise.all(updatePromises);
    }

    async itemExists(id: number): Promise<boolean> {
        const item = await this.prisma.item.findUnique({
            where: { id },
        });
        return !!item;
    }
}

export default ItemRepository;