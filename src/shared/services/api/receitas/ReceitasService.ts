import { Api } from "../ApiConfig"
import type { IReceita } from "../../../interfaces/IReceita";

const getAll = async (): Promise<IReceita[]> => {
    const { data } = await Api().get('/receitas')
    return data
}

const getById = async (id?: string): Promise<IReceita> => {
    const { data }  = await Api().get(`/receitas/${id}`)
    return data
}

const create = async (dataToCreate: Omit<IReceita, 'id'>): Promise<IReceita> => {
    const { data } = await Api().post<any>('/receitas', dataToCreate)
    return data
}

const updateById = async (id?: string, dataToUpdate?: IReceita): Promise<IReceita> => {
    const { data } = await Api().put(`/receitas/${id}`, dataToUpdate)
    return data
}

const deleteById = async (id: string): Promise<undefined> => {
    await Api().delete(`/receitas/${id}`)
    return undefined
}

export const ReceitasService = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
}
