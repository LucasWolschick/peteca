import { api } from "./configs/axiosConfigs";

export type Item = {
  id: number;
  nome: string;
  quantidade: number;
  unidadeMedida: string;
  local: string;
};

export const itemsAPI = {
  criar: async function (
    nome: string,
    quantidade: number,
    unidadeMedida: string,
    local: string
  ) {
    return await api.request({
      url: `/api/items/create`,
      method: "POST",
      data: {
        nome,
        quantidade,
        unidadeMedida,
        local,
      },
    });
  },
  //Get All Items
  getitems: async function () {
    return await api.request({
      url: `/api/items`,
      method: "GET",
    });
  },

  // Update items
  update: async function (
    id: number,
    nome?: string,
    quantidade?: number,
    unidadeMedida?: string,
    local?: string
  ) {
    return await api.request({
      url: `/api/items/update-multiple`,
      method: "PUT",
      data: [
        {
          id,
          nome,
          quantidade,
          unidadeMedida,
          local,
        },
      ],
    });
  },

  // Delete items
  delete: async function (id: number) {
    return await api.request({
      url: `/api/items/${id}`,
      method: "DELETE",
    });
  },
};
