import Axios from 'axios';
import React from 'react';


export function getAllContacts(){

    axios.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

      
}