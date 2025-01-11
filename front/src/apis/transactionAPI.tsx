import {AxiosResponse} from "axios";
import {api} from "./configs/axiosConfigs";

export type Transaction = {}

export const transactionAPI =
    {
        getFilter: async function (from ?: Date,
                                   to ?: Date,
                                   q?: string
        ): Promise<AxiosResponse<Transaction>> {
            const transactions = await api.request({
                url: `/api/transaction/filter`,
                method: "GET",
                params: {from, to, q},
            });

            transactions.data = transactions.data.map((transaction: Transaction) => {
                return transaction;
            });

            return transactions;
        }
    }