import { api } from "./configs/axiosConfigs";

export const ItemAPI = {
    getItems: async function () {
        return await api.request({
            url: `/api/items/`,
            method: "GET"
        });
    },

    updateMultiple: async function () {
        return await api.request({
            url: `/api/items/update-multiple`,
            method: "PUT"
        });
    },

    getItemById: async function (id: number) {
        return await api.request({
            url: `/api/items/${id}`,
            method: "GET"
        });
    },

    deleteItem: async function (id: number) {
        return await api.request({
            url: `/api/items/${id}`,
            method: "DELETE"
        });
    },

    searchItems: async function (searchParams: {
        nome?: string;
        quantidade?: number;
        unidadeMedida?: string;
        local?: string;
    }) {
        return await api.request({
            url: `/api/items/search`,
            method: "GET",
            params: searchParams
        });
    },

    createItem: async function (nome: string, quantidade: number, unidadeMedida: string, local: string) {
        return await api.request({
            url: `/api/items/create`,
            method: "POST",
            data: {
                nome,
                quantidade,
                unidadeMedida,
                local
            }
        });
    }
};
