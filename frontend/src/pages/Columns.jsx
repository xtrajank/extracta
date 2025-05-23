import { useNavigate } from "react-router-dom";
import ColumnSelector from "../components/ColumnSelector";

export default function Columns({ sessionId }) {
    const navigate = useNavigate();

    return (
        <>
            <ColumnSelector onSuccess={() => navigate("/data")} sessionId={sessionId}/>
        </>
    );
}
