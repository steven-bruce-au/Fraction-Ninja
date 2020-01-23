import { default as React, SFC }  from 'react';
import styles from './Header.module.scss';

/** The Header is a react functional component */
const Header: React.SFC<{}> = (props) => {
  return (
  	<div className={styles.header}>
  		<div className={styles.title}>Fraction Ninja</div>
  		<div className={styles.description}>Learn about fractions and decimals</div>
    </div>);
}

export default Header;



