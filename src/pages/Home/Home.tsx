import { useQuery } from "@tanstack/react-query";
import { ReceitasService } from "../../shared/services/api/receitas/ReceitasService";
import styles from "./Home.module.css"
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
    function handleDelete(id: string) {
        ReceitasService.deleteById(id)
        console.log(`Receita de id ${id} deletada com sucesso!`)
    }

    const navigate = useNavigate()
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['receitas'],
        queryFn: ReceitasService.getAll
    });

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Ops, algo deu errado!</p>;

    return (
        <div className={styles.lista}>

            <h1>Cardápio</h1>
            <Link to="/nova" className={styles.botao}>Adicionar Nova Receita</Link>
            {data?.map((receita) =>
                <div key={receita.id} className={styles.card}>
                
                <img src={receita.imagem} className={styles.imagem} />

                <h3>{receita.nome}</h3>
                <p>{receita.descricao}</p>
                <strong>R${receita.preco}</strong>

                <div className={styles.botoes}>
                    <button onClick={() => handleDelete(receita.id)}>Deletar Receita</button>
                    <button onClick={() => navigate(`/editar/${receita.id}`)}>Editar Receita</button>
                </div>
                
                </div>
            )}

        </div>
    );
};
