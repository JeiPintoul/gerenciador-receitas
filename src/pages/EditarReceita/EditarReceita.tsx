import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { createReceitaSchema as editReceitaSchema } from '../NovaReceita/NovaReceita';
import type { CreateReceitaFormData as EditReceitaFormData } from '../NovaReceita/NovaReceita';
import { useReceitaById, useUpdateReceita } from '../../hooks/useReceitas';

export function EditarReceita () {
    const { id } = useParams<{ id: string }>()

    const navigate = useNavigate()

    const { mutate: atualizarReceita } = useUpdateReceita()

    const { data, isLoading, isError } = useReceitaById(id!)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditReceitaFormData>({
        resolver: zodResolver(editReceitaSchema)
    })

    const onSubmit = (dadosAtualizados: EditReceitaFormData) => {
        if (!id) return
        atualizarReceita({...dadosAtualizados, id})
        alert("Receita Atualizada!")
        navigate("/")
    }

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data, reset])

    if (isLoading) return <p>Carregando dados da receita...</p>
    if (isError || Object.keys(errors).length > 0) return <h1>Erro na busca da receita. Tente novamente.</h1>

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