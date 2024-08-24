import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentAnalysis = ({ filename }) => {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        const fetchEntities = async () => {
            const res = await axios.post('/analyze', { filename });
            setEntities(res.data.entities);
        };

        fetchEntities();
    }, [filename]);

    return (
        <div className="document-analysis">
            <h2>Extracted Entities</h2>
            <ul>
                {entities.map((entity, index) => (
                    <li key={index}>
                        {entity[0]} - {entity[1]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentAnalysis;
