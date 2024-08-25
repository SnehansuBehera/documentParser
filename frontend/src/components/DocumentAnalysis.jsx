import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentAnalysis = ({ filename }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('http://localhost:5000/analyze', { filename });
                console.log(res);
                setData(res.data);
            } catch (error) {
                console.error('Error analyzing document:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, [filename]);


    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Document Analysis Results</h2>
            {data ? (
                <div>
                    <Section title="Clauses" items={data.clauses} />
                    <Section title="Obligations" items={data.obligations} />
                    <Section title="Rights" items={data.rights} />
                    <Section title="Potential Risks" items={data.potential_risks} />
                </div>
            ) : (
                <p className="text-gray-600">Analyzing document...</p>
            )}
        </div>
    );
};

const Section = ({ title, items }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {items.length > 0 ? (
            <ul className="list-disc list-inside ml-4">
                {items.map((item, index) => (
                    <li key={index} className="text-gray-800">{item}</li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-600">No {title.toLowerCase()} found.</p>
        )}
    </div>
);

export default DocumentAnalysis;
