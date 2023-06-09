// Components
import NextLink from 'next/link'
// Config
import { THEMES } from '@/modules/theme/config'
// Types
import type { LinkButtonProps } from '@/types/navigation'
// Styles
import styles from '@/styles/Button.module.css'

/**
 * A simple themeable link button for navigation
 * @see {@link LinkButtonProps} for props specification
 * @param LinkButtonProps The component props
 * @returns The LinkButton component
 *
 * @default theme 'primary'
 */
export default function LinkButton ({ children, href, theme = THEMES.primary }: LinkButtonProps) {
  const themeStyle = theme === THEMES.secondary ? styles.btn__secondary : styles.btn__primary
  const btnStyle = `${styles.btn} ${themeStyle} ${styles.group}`

  return (
    <NextLink href={href}>
      <div className={btnStyle}>
        <div className={styles.btn__children}>
          {children?.toUpperCase()} <span className={styles.btn__arrow}>&rarr;</span>
        </div>
        <div className={styles.btn__circle} />
      </div>
    </NextLink>
  )
}
