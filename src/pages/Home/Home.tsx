import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReceitasService } from "../../shared/services/api/receitas/ReceitasService";
import styles from "./Home.module.css"
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
    const queryClient = useQueryClient()

    const handleDelete = async (id: string) => {
        if (window.confirm("Deseja mesmo deletar esta receita?")) {
            await ReceitasService.deleteById(id)
            queryClient.invalidateQueries({queryKey: ['receitas']})
            console.log(`Receita de id ${id} deletada com sucesso!`)
        }
    }

    const navigate = useNavigate()
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['receitas'],
        queryFn: ReceitasService.getAll
    });

    if (isLoading) return <p className={styles.erro}>Carregando...</p>;
    if (isError) return <p className={styles.erro}>Ops, algo deu errado!</p>;

    return (
        <div className={styles.container}>

            <div>
                <h1 className={styles.titulo}>Cardápio</h1>
            </div>

            <Link to="/nova" className={styles.botao}>Adicionar Nova Receita</Link>

            <div className={styles.lista}>
                {data?.map((receita) =>
                    <div key={receita.id} className={styles.card}>
                    
                        <img src={receita.imagem} className={styles.imagem} />

                        <h3>{receita.nome}</h3>
                        <p>{receita.descricao}</p>
                        <strong>R${receita.preco}</strong>

                        <div className={styles.botoes}>
                            <button className={`${styles.btnAcao} ${styles.btnDeletar}`} onClick={() => handleDelete(receita.id)}>Deletar Receita</button>
                            <button className={`${styles.btnAcao} ${styles.btnEditar}`} onClick={() => navigate(`/editar/${receita.id}`)}>Editar Receita</button>
                        </div>
                
                    </div>
                )}
            </div>

        </div>
    );
};
