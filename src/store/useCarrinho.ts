import { create } from "zustand";
import type { IReceita } from "../interfaces/IReceita";
import { createJSONStorage, persist } from "zustand/middleware";

interface ICarrinhoStore {
    itens: IReceita[],
    adicionarItem: (receita: IReceita) => void
    removerItem: (id: string) => void
    limparCarrinho: () => void
}

export const useCarrinho = create<ICarrinhoStore>()(
    persist(
        (set) => ({
            itens: [],

            adicionarItem: (novaReceita) => set((state) => ({
                itens: [...state.itens, novaReceita]
            })),

            removerItem: (id) => set((state) => ({
                itens: state.itens.filter(item => item.id !== id)
            })),

            limparCarrinho: () => set(() => ({ itens: [] }))
        }),
        {
        name: 'carrinho-storage',
        storage: createJSONStorage(() => localStorage)
        }
    )
);