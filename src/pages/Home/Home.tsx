import styles from "./Home.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { IReceita } from "../../interfaces/IReceita";
import { ModalReceita } from "./ModalReceita";
import { useAllReceitas, useDeleteReceita } from "../../hooks/useReceitas";
import { useCarrinho } from "../../store/useCarrinho";

export const Home = () => {
    const navigate = useNavigate()

    const { data, isLoading, isError } = useAllReceitas()

    const { mutate: deletarReceita } = useDeleteReceita()

    const [receitaSelecionada, setReceitaSelecionada] = useState<IReceita | null>(null)

    const itens = useCarrinho(state => state.itens)

    const handleDelete = (id: string) => {
        if (window.confirm("Deseja mesmo deletar esta receita?")) {
            deletarReceita(id)
            console.log(`Receita de id ${id} deletada com sucesso!`)
        }
    }

    if (isLoading) return <p className={styles.erro}>Carregando...</p>;
    if (isError) return <p className={styles.erro}>Ops, algo deu errado!</p>;

    return (
        <div className={styles.container}>

            <div>
                <h1 className={styles.titulo}>Cardápio</h1>
                <h2>Carrinho: {itens.length}</h2>

            </div>

            <div className={styles.lista}>
                {data?.map((receita) =>
                    <div key={receita.id} className={styles.card} onClick={() => setReceitaSelecionada(receita)}>
                    
                        <img
                            src={receita.imagem}
                            alt={'https://static.itdg.com.br/images/360-240/47d6583c93d77edac5244cab67ba660b/253447-378226756-original.jpg'}
                            className={styles.imagem}
                        />

                        <h3>{receita.nome}</h3>
                        <p>{receita.descricao}</p>
                        <strong>R${receita.preco}</strong>

                        <div className={styles.botoes} onClick={(e) => {e.stopPropagation()}}>
                            <button
                                className={`${styles.btnAcao}
                                ${styles.btnDeletar}`}
                                onClick={() => handleDelete(receita.id)}>
                                Deletar Receita
                            </button>

                            <button
                                className={`${styles.btnAcao} ${styles.btnEditar}`}
                                onClick={() => navigate(`/editar/${receita.id}`)}>
                                Editar Receita
                            </button>
                        </div>
                
                    </div>
                )}
            </div>

            { receitaSelecionada &&
                (<ModalReceita receita={receitaSelecionada} aoFechar={() => setReceitaSelecionada(null)} />)
            }
        </div>
    );
};
