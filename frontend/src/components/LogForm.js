// MultiSelectForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LogForm = () => {
    // const [apiResponse, setApiResponse] = useState([]);
    // const [formData, setFormData] = useState({
    //     level: '',
    //     message: '',
    //     resourceId: '',
    //     timestamp: '',
    //     traceId: '',
    //     spanId: '',
    //     commit: '',
    //     // metadata: {
    //     //     parentResourceId: '',
    //     // },
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const apiUrl = "http://localhost:3000/api/logs";
    //     try {
    //         // Make an API call using axios
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //           });

    //           const responseData = await response.json();
    //           setApiResponse(responseData);;
    //     } catch (error) {
    //         console.error('API Error:', error);
    //     }
    // };
    const [apiResponse, setApiResponse] = useState([]);
    const [formData, setFormData] = useState({
        // level: '',
        // message: '',
        // resourceId: '',
        // timestamp: '',
        // traceId: '',
        // spanId: '',
        // commit: '',
        // // metadata: {
        // //   parentResourceId: { type: String }
        // // }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the changed field is within metadata, update it accordingly
       
        if (name.startsWith('metadata.')) {
            const metadataKey = name.replace('metadata.', '');
            setFormData((prevData) => ({
                ...prevData,
                metadata: {
                    ...prevData.metadata,
                    [metadataKey]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = "http://localhost:3000/api/logs";
        console.log(Object.keys(formData).length, 'kkkkkkkkk')
        if (Object.keys(formData).length === 0) {
            
            console.error('Form data is empty. Please fill in the form before submitting.');
            return;
        }
        try {
            // Make an API call using fetch
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(apiResponse);
            if (!response.ok) {
                // Handle non-successful response, e.g., show an error message
                console.error('API Error:', response.status, response.statusText);
                return;
            }
            const responseData = await response.json();
            console.log(responseData,'hhhhhoiiii');

            // Ensure responseData is an array before calling map
            const logsArray = responseData? responseData.logs : [];
            console.log(responseData,logsArray,'hhhhhoiiiilllllll');

            const filteredLogs = logsArray.map(log => {
                const filteredLog = {};
                
                for (const key in formData) {
                    if (formData.hasOwnProperty(key) && formData[key] === log[key]) {
                        filteredLog[key] = log[key];
                    }
                }
                filteredLog['id'] = log['_id'];
                return filteredLog;
            });
            setApiResponse(filteredLogs);
            console.log(apiResponse, filteredLogs, 'llllllll');

        } catch (error) {
            console.error('API Error:', error);
        }
    };



    return (
        <div className='container'>
            <div className='logForm'>
            <h2>Logi Ingestor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="level">Level:</label>
                    <input
                        type="text"
                        id="level"
                        name="level"
                        placeholder="Enter level"
                        value={formData.level}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <input
                        type="text"
                        id="message"
                        name="message"
                        placeholder="Enter message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="resourceId">Resource ID:</label>
                    <input
                        type="text"
                        id="resourceId"
                        name="resourceId"
                        placeholder="Enter resource ID"
                        value={formData.resourceId}
                        onChange={handleChange}
                    />

                </div>
                <div>
                    <label htmlFor="timestamp">timestamp ID:</label>
                    <input
                        type="text"
                        id="timestamp"
                        name="timestamp"
                        placeholder="Enter timestamp ID"
                        value={formData.timestamp}
                        onChange={handleChange}
                    />

                </div>
                <div>
                    <label htmlFor="traceId">traceId ID:</label>
                    <input
                        type="text"
                        id="traceId"
                        name="traceId"
                        placeholder="Enter traceId ID"
                        value={formData.traceId}
                        onChange={handleChange}
                    />

                </div>
                <div>
                    <label htmlFor="spanId">spanId ID:</label>
                    <input
                        type="text"

                        id="spanId"
                        name="spanId"
                        placeholder="Enter spanId ID"
                        value={formData.spanId}
                        onChange={handleChange}
                    />

                </div>
                <div>
                    <label htmlFor="commit">commit:</label>
                    <input
                        type="text"
                        id="commit"
                        name="commit"
                        placeholder="Enter commit"
                        value={formData.commit}
                        onChange={handleChange}
                    />

                </div>
                <div>
                    {/* <label htmlFor="parentResourceId">parentResourceId:</label>
                <input
                    type="text"
                    id="parentResourceId"
                    name="parentResourceId"
                    placeholder="Enter parentResourceId"
                    value={formData.metadata.parentResourceId}
                    onChange={handleChange}
                /> */}


                </div>
                {/* Add more input fields as needed for other properties in the JSON structure */}

                <button type="submit">Submit</button>
            </form >

            </div>

            {apiResponse.length > 0 && <div className='searchResults'><h2 style={{color: 'white'}}>Searched Results</h2>
                <ul>
                    {apiResponse.map((log, index) => (
                        <li key={index}>
                            <pre>{JSON.stringify(log, null, 2)}</pre>
                        </li>
                    ))}
                </ul></div>}
        </div >
    );
};

export default LogForm;
