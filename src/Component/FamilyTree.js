import React, { useState, useEffect } from 'react';

const FamilyTree = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://genealogy-application-5f3dd-default-rtdb.firebaseio.com/UserData.json');
      const data = await response.json();
      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Family Tree</h1>
      {userData.length > 0 ? (
        <ul>
          {/* Iterate through userData and display family tree information */}
          {Object.entries(userData).map(([key, value]) => (
            <li key={key}>
              {value.Name} ({value.Relationship})
              {value.Children && (
                <ul>
                  {/* Recursively display children if available */}
                  {Object.entries(value.Children).map(([childKey, childValue]) => (
                    <li key={childKey}>{childValue.Name} ({childValue.Relationship})</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No family members added yet.</p>
      )}
    </div>
  );
};

export default FamilyTree;
