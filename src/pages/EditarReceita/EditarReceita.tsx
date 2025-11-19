import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import type { IReceita } from '../../shared/interfaces/IReceita';
import { ReceitasService } from '../../shared/services/api/receitas/ReceitasService';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const receitaSchema = z.object({
    nome: z.string().min(1, "Precisa ter um nome válido."),
    descricao: z.string().min(10, "Descrição precisa ser preenchida."),
    preco: z.number().nonnegative(),
    receita: z.string().min(10, "Precisa ser uma receita válida."),
    imagem: z.url("O envio precisa ser uma url.")
})

export function EditarReceita () {
    const { id } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['receitas', id],
        queryFn: () => ReceitasService.getById(id)
    })

    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(receitaSchema)
    })

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data, reset])

    const onSubmit = async (dadosAtualizados: any) => {
        await ReceitasService.updateById(id, dadosAtualizados)
        alert("Receita Atualizada!")
        navigate("/")
    }

    if (isLoading) return <p>Carregando dados da receita...</p>

    return (
        <>
            <div>
                <h1>Editar Receita</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder="Nome" {...register("nome")}/>
                    <input placeholder="Descrição" {...register("descricao")} />
                    <input type="number" placeholder="Preço" {...register("preco", { valueAsNumber: true })} />
                    <input type="url" placeholder="URL da Imagem" {...register("imagem")} />
                    <textarea placeholder='Receita' {...register("receita")} />
                    <button type="submit">Salvar</button>
                </form>
            </div>

            <div>
                <button onClick={() => navigate('/')}>Voltar</button>
            </div>
        </>
    );
}