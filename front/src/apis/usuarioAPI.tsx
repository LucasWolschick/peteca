import { api } from "./configs/axiosConfigs";

export const UsuarioAPI = {
    login: async function (email: string, senha: string, remember: boolean) {
        return await api.request({
            url: `/api/user/login`,
            method: "POST",
            data: {
                email,
                password: senha,
                remember
            }
        });
    }
};
