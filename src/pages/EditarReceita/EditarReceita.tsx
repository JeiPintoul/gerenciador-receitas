import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import type { IReceita } from '../../shared/interfaces/IReceita';
import { ReceitasService } from '../../shared/services/api/receitas/ReceitasService';
import { Link, useNavigate } from 'react-router-dom';

const receitaSchema = z.object({
    nome: z.string().min(1, "Precisa ter um nome válido."),
    descricao: z.string().min(10, "Descrição precisa ser preenchida."),
    preco: z.number().nonnegative(),
    receita: z.string().min(10, "Precisa ser uma receita válida."),
    imagem: z.url("O envio precisa ser uma url.")
})

export function EditarReceita () {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(receitaSchema)
    })

    function createReceita( data: Omit<IReceita, "id"> ) {
        ReceitasService.create(data)
        console.log(data ? data : errors)
    }

    return (
        <>
            <div>
                <h1>Adicionar Nova Receita</h1>
                <form onSubmit={handleSubmit(createReceita)}>
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