import React, {useState} from "react";
import './App.css';

import { ReactComponent as koala } from './img/koala.svg';
import { ReactComponent as panter } from './img/panter.svg';


function PetCreator (){
    const petArray = [koala, panter];


    const [currentPetIndex, setCurrentPetIndex] = useState(0);

  
    const CurrentPet = petArray[currentPetIndex];

    return(
        <CurrentPet/>
    );
}

export default PetCreator;