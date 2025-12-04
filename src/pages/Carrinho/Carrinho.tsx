import { useCarrinho } from '../../store/useCarrinho'
import styles from './Carrinho.module.css'
import { FiTrash2 } from 'react-icons/fi'

export const Carrinho = () => {
    const limparCarrinho = useCarrinho(state => state.limparCarrinho)
    const removerItem = useCarrinho(state => state.removerItem)
    const data = useCarrinho(state => state.itens)

    return (
        <div className={styles.container}>
            <h1>Meu Carrinho</h1>
            <div style={{ margin: 20 }}>
                <button className={styles.botaoLimpar} onClick={() => limparCarrinho()}>
                    Limpar Carrinho
                </button>
            </div>

            {data && data.length > 0 ? (
                <div className={styles.lista}>
                    {data.map((receita) => (
                        <div key={receita.id} className={styles.card}>
                            <img src={receita.imagem} className={styles.imagem} alt={receita.nome} />

                            <h3>{receita.nome}</h3>
                            <p>{receita.descricao}</p>
                            <strong>R${String(receita.preco).replace('.', ',')}</strong>

                            <div onClick={(e) => { e.stopPropagation() }}>
                                <button
                                    className={styles.botaoRemover}
                                    onClick={() => removerItem(receita.id)}>
                                    <FiTrash2 className={styles.icon} />
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <p>Seu carrinho está vazio.</p>
            )}
        </div>
    )
}
