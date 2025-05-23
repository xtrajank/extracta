import { useState, useEffect } from 'react';
import { getColumns, postConfig } from '../api';

export default function ColumnSelector({ onSuccess, sessionId }) {
  const [columns, setColumns] = useState([]);
  const [selected, setSelected] = useState([]);
  const [combineEnabled, setCombineEnabled] = useState(false);
  const [groupByKey, setGroupByKey] = useState('');

  // Fetch columns from backend on mount
  useEffect(() => {
    const fetchColumns = async () => {
      try {
          const response = await getColumns(sessionId);
          setColumns(response.data.columns);
      } catch (err) {
        console.error("Failed to load columns:", err);
      }
    };
    fetchColumns();
  }, [sessionId]);

  // Toggle a column in the selection
  const toggleColumn = (columnName) => {
    const newSelected = selected.includes(columnName)
      ? selected.filter(c => c !== columnName)
      : [...selected, columnName];

    setSelected(newSelected);

    // Reset key and aggregate columns if deselected
    if (!newSelected.includes(groupByKey)) setGroupByKey('');
  };

  // Select or deselect all columns
  const handleSelectAll = () => {
    if (selected.length === columns.length) {
      setSelected([]);
      setGroupByKey('');
    } else {
      setSelected(columns);
    }
  };

  // Handle final submission
  const handleSubmit = async () => {
    const payload = {
      columns: selected,
      combine: combineEnabled,
      key: groupByKey
    };

    try {
      await postConfig(sessionId, payload)
      console.log("Payload:", payload);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Select Columns</h2>
      <button onClick={handleSelectAll}>
        {selected.length === columns.length ? 'Deselect All' : 'Select All'}
      </button>
      <ul className="colSelect">
        {columns.map((col) => (
          <li className="colSelect" key={col}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(col)}
                onChange={() => toggleColumn(col)}
              />
              {col}
            </label>
          </li>
        ))}
      </ul>

      <hr />

      <label>
        <input
          type="checkbox"
          checked={combineEnabled}
          onChange={() => {
            setCombineEnabled(!combineEnabled);
            setGroupByKey('');
          }}
        />
        Enable Combine
      </label>

      {combineEnabled && selected.length > 0 && (
        <>
          <h3>Select Group-By Key</h3>
          <select
            value={groupByKey}
            onChange={(e) => {
              setGroupByKey(e.target.value);
            }}
          >
            <option value="">--- Select Key ---</option>
            {selected.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </>
      )}

      <div>
        <h2>Summary</h2>
        <p>Selected Columns: {selected.join(', ') || 'None'}</p>
        {combineEnabled && (
          <>
            <p>Group By Key: {groupByKey || 'None'}</p>
          </>
        )}
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '1em' }}>
        Submit
      </button>
    </div>
  );
}
