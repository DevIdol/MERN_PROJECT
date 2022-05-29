import React from 'react';
import styles from './Card.module.css'
const Card = ({className, children}) => {
    return (
        <div className={`${styles.card} ${className}`}>
            {children}
        </div>
    );
};

export default Card;