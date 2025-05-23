// uses extracted data to display/copy a table
import { useState, useEffect } from 'react';
import { getData } from '../api';
import copyIcon from '../assets/copy-square.png';

export default function DataTable({ sessionId }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!sessionId) {console.warn("session id missing."); return;}

        const displayData = async () => {
            try {
                const response = await getData(sessionId);
                setData(response.data);
            } catch (err) {
                console.error("Failed to display data:", err)
            }
        };
        displayData();
    }, [sessionId]);

    const handleCopy = () => {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]).join("\t");
        const rows = data
            .map((row) => Object.values(row).join("\t"))
            .join("\n");

        const tableText = `${headers}\n${rows}`;

        navigator.clipboard.writeText(tableText).then(() => {
        }).catch((err) => {
            console.error("Copy failed:", err);
        });
    };


    return (
        <div>
            <h2>Processed Data</h2>
            {/* button */}
            <div style={{position: "relative"}}>
                <button
                    onClick={handleCopy}
                    style={{
                        position: "absolute",
                        top: -25,
                        left: -50,
                        opacity: 0.3,
                        transition: "opacity 0.2s",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        zIndex: 10
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.3)}
                    title="Copy table"
                >
                    <img src={copyIcon} alt="Copy table" style={{ width: "24px", height: "24px" }}/>
                </button>

                {/* table */}
                {data.length===0 ? (<p>No data.</p>) : (
                    <table id="table">
                        <thead>
                            <tr>{Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}