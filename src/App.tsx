import React from 'react';
import Header from './Header';
import FractionComparator from './FractionComparator';
import styles from './App.module.scss';

/** Main react application component, displays the header and the comparator */
const App: React.FC = () => {
  return (
  	<div className={styles.App}>
  	  <Header/>
      <FractionComparator/>
     </div>
  );
}

export default App;
