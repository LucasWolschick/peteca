import { api } from "./configs/axiosConfigs";

export const UsuarioAPI = {
    register: async function (nome: string, email: string, senha: string, ra?: string, matricula?: string) {
        return await api.request({
            url: `/api/user/register`,
            method: "POST",
            data: {
                nome,
                email,
                senha,
                ra,
                matricula
            }
        });
    },

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

    confirmEmail: async function (token: string) {
        return await api.request({
            url: `/api/user/confirm/${token}`,
            method: "POST",
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
    },

    getLoggedUser: async function () {
        return await api.request({
            url: `/api/user/me`,
            method: "GET",
        });
    },

    deleteUser: async function (id: number) {
        return await api.request({
            url: `/api/user/${id}`,
            method: "DELETE",
        });
    },

    getUserById: async function (id: number) {
        return await api.request({
            url: `/api/user/${id}`,
            method: "GET",
        });
    },

    getAllUsers: async function () {
        return await api.request({
            url: `/api/user/`,
            method: "GET",
        });
    },
};
