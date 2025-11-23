import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { ReceitasService } from '../../api/receitas/ReceitasService';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NovaReceita.module.css'
import { useQueryClient } from '@tanstack/react-query';

export const createReceitaSchema = z.object({
    nome: z.string().min(1, "Precisa ter um nome válido."),
    descricao: z.string().min(10, "Descrição precisa ser preenchida."),
    preco: z.number().nonnegative(),
    receita: z.string().min(10, "Precisa ser uma receita válida."),
    imagem: z.url("O envio precisa ser uma url.")
})

export type CreateReceitaFormData = z.infer<typeof createReceitaSchema>

export function NovaReceita () {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createReceitaSchema)
    })

    async function createReceita( data: CreateReceitaFormData ) {
        await ReceitasService.create(data)
        if (errors) console.log(errors)
        queryClient.invalidateQueries({queryKey: ['receitas']})
        navigate('/')
    }

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Adicionar Nova Receita</h1>
                <Link className={styles.botaoVoltar} to='/'>Voltar</Link>

                <form className={styles.input} onSubmit={handleSubmit(createReceita)}>
                    <input placeholder="Nome" {...register("nome")}/>
                    <input placeholder="Descrição" {...register("descricao")} />
                    <input type="number" placeholder="Preço" {...register("preco", { valueAsNumber: true })} />
                    <input type="url" placeholder="URL da Imagem" {...register("imagem")} />
                    <textarea placeholder='Receita' {...register("receita")} />
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </>
    );
}
