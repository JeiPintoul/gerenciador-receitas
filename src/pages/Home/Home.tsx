import { useQuery } from "@tanstack/react-query";
import { ReceitasService } from "../../shared/services/api/receitas/ReceitasService";
import styles from "./Home.module.css"
import { Link } from "react-router-dom";

export const Home = () => {
    // Desestruturando: pegamos os dados, o status de carregamento e se deu erro
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

                
                </div>
            )}

        </div>
    );
};
