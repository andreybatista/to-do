import Logo from '../assets/logo-to-do.svg'

import styles from './Header.module.css'

function Header() {

  return (
    <header className={styles.container}>
      <img src={Logo} alt="Logo To-Do" width='126' height='48' />
    </header>
  )
}

export default Header
