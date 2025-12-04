import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'

export default function Sidebar() {
    return (
        <nav className={styles.sidebar}>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
                end
            >
                <AiFillHome className={styles.icon} />
                <span>Home</span>
            </NavLink>

            <NavLink
                to="/nova"
                className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
                <AiOutlinePlus className={styles.icon} />
                <span>Adicionar nova receita</span>
            </NavLink>

            <NavLink
                to="/carrinho"
                className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
                <FiShoppingCart className={styles.icon} />
                <span>Carrinho</span>
            </NavLink>
        </nav>
    )
}
