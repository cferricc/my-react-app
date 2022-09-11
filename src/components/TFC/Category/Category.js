import React from 'react';
import { useParams } from 'react-router-dom';

export default function Preferences() {
    let params = useParams();

    return(
        <h1>{params.categoryName}</h1>
    );
}