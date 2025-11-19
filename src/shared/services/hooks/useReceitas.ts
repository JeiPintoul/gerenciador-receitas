import { useQuery } from "@tanstack/react-query"
import type { IReceita } from "../../interfaces/IReceita"
import { ReceitasService } from "../api/receitas/ReceitasService"

export const useAllReceitas = () => {
    return useQuery<IReceita[]>({
        queryKey: ['receitas'],
        queryFn: ReceitasService.getAll
    })
}

export const useReceita = (id: string) => {
    return useQuery<IReceita>({
        queryKey: ['receitas'],
        queryFn: () => ReceitasService.getById(id)
    })
}

export const useCreateReceita = (data: IReceita) => {
    
}