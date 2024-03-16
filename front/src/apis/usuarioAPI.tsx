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
    },

    passwordRecovery: async function (email: string) {
        return await api.request({
            url: `/api/user/resetpassword`,
            method: "POST",
            data: {
                email
            }
        });
    },

    resetPassword: async function (token: string, senha: string) {
        return await api.request({
            url: `/api/user/resetpassword/${token}`,
            method: "POST",
            data: {
                password: senha
            }
        });
    }
};
