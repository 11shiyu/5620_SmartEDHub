import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'; 

function CreateAssignment() {
    
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/ProfileTeacher'); 
    };

    return (
        <div>
            
        </div>
    );
}

export default CreateAssignment;