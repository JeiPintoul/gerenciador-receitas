import type { IReceita } from "../../interfaces/IReceita";
import styles from "./ModalReceita.module.css"
import { useScrollBlock } from "../../hooks/useScrollBlock";
import { useCarrinho } from "../../store/useCarrinho";


export function ModalReceita(props: {receita: IReceita, aoFechar: () => void}) {
    useScrollBlock()
    
    const adicionarCarrinho = useCarrinho(state => state.adicionarItem)

    return (
        <>
        {props.receita && (
                <div onClick={() => {props.aoFechar()}} className={styles.overlay}>
                    <div onClick={(e) => {e.stopPropagation()}} className={styles.conteudo}>
                        <img src={props.receita.imagem} />
                        <h2>{props.receita.nome}</h2>
                        <h3>{props.receita.descricao}</h3>
                        <strong>R${props.receita.preco}</strong>

                        <hr />
                        <p>{props.receita.receita}</p>

                        <button onClick={() => {props.aoFechar()}}>
                            Fechar
                        </button>

                        <button onClick={() => {adicionarCarrinho(props.receita), alert('Prato adicionado ao Carrinho com sucesso!')}}>
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}