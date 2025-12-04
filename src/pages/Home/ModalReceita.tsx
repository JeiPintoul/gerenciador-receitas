import type { IReceita } from "../../interfaces/IReceita";
import styles from "./ModalReceita.module.css"
import { useScrollBlock } from "../../hooks/useScrollBlock";
import { useCarrinho } from "../../store/useCarrinho";
import { FiShoppingCart } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'


export function ModalReceita(props: {receita: IReceita, aoFechar: () => void}) {
    useScrollBlock()
    
    const adicionarCarrinho = useCarrinho(state => state.adicionarItem)

    const FALLBACK_IMG = 'https://via.placeholder.com/560x360?text=Sem+imagem';

    return (
        <>
        {props.receita && (
                <div onClick={() => {props.aoFechar()}} className={styles.overlay}>
                    <div onClick={(e) => {e.stopPropagation()}} className={styles.conteudo}>
                        <img
                            src={props.receita.imagem || FALLBACK_IMG}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG }}
                            alt={props.receita.nome}
                        />
                        <h2>{props.receita.nome}</h2>
                        <h3>{props.receita.descricao}</h3>
                        <strong>R${props.receita.preco}</strong>
                        <p>{props.receita.receita}</p>
                        <div className={styles.botoes}>
                            <button onClick={() => {props.aoFechar()}}>
                                <AiOutlineClose className={styles.icon} />
                                Fechar
                            </button>

                            <button onClick={() => {adicionarCarrinho(props.receita); alert('Prato adicionado ao Carrinho com sucesso!')}}>
                                <FiShoppingCart className={styles.icon} />
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
