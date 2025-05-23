import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "../components/DataTable";

export default function Data({ sessionId }) {
    return (
        <>
            <DataTable sessionId={sessionId}/>
        </>
    );
}
