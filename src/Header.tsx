import { default as React, SFC }  from 'react';
import styles from './Header.module.scss';

/** The Header is a react functional component */
const Header: React.SFC<{}> = (props) => {
  return (
  	<div className={styles.header}>
  		<div className={styles.title}>Fraction Ninja</div>
  		<div className={styles.description}>Learn about fractions and decimals</div>
	    <a href="https://github.com/steven-bruce-au/Fraction-Ninja">
	    	<img className={styles.github} src="./GitHub_Logo_White.png"/>
	    </a>
    </div>);
}

export default Header;



