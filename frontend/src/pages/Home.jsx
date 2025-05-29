import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import LoginDiv from '../components/Login';

export default function Home({ setSessionId }) {
    const navigate = useNavigate();

    return (
        <>
            <h1>extracta</h1>
            <LoginDiv/>
            <FileUpload onSuccess={ () => navigate('/columns') } setSessionId={setSessionId}/>
        </>
    );
}
