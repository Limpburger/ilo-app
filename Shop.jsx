import React, {useState} from "react";
import './App.css';

import { ReactComponent as head1 } from './img/head1.svg';
import { ReactComponent as head2 } from './img/head2.svg';
import { ReactComponent as head3 } from './img/head3.svg';


const Shop = () => {
    const shopItems = [head1, head2, head3];

    for(let i=0; i< shopItems.length; i++){
        console.log("hello");
    }
}

export default Shop;