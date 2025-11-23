import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { IReceita } from "../interfaces/IReceita"
import { ReceitasService } from "../api/receitas/ReceitasService"

export const useAllReceitas = () => {
    return useQuery<IReceita[]>({
        queryKey: ['receitas'],
        queryFn: ReceitasService.getAll
    })
}

export const useReceitaById = (id: string) => {
    return useQuery<IReceita>({
        queryKey: ['receitas', id],
        queryFn: () => ReceitasService.getById(id)
    })
}

export const useCreateReceita = () => {
    const queryClient = useQueryClient()

    return useMutation ({
        mutationFn: (data: Omit<IReceita, 'id'>) => ReceitasService.create(data),

        onSuccess: () => queryClient.invalidateQueries({queryKey: ['receitas']})
    })
}

export const useUpdateReceita = () => {
    const queryClient = useQueryClient()

    return useMutation ({
        mutationFn: (data: IReceita) => ReceitasService.updateById(data.id, data),

        onSuccess: () => queryClient.invalidateQueries({queryKey: ['receitas']})
    })
}

export const useDeleteReceita = () => {
    const queryClient = useQueryClient()

    return useMutation ({
        mutationFn: (id: string) => ReceitasService.deleteById(id),

        onSuccess: () => queryClient.invalidateQueries({queryKey: ['receitas']})
    })
}