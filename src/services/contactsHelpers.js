import axios from 'axios';

export default class ContactHelpers{

    getAllContacts = async () => {

        return await axios.get('http://localhost:3030/api/v1/contacts/')
            .then(function (response) {
                //console.log(response.data);
                return response.data
            })
            .catch(function (error) {
                //console.log(error);
            });
    
          
    }
}
