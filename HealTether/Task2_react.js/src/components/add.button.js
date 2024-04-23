import React from 'react';

const AddTripButton = (props) => {
    const setWantToAdd = props.setWantToAdd
    function handleClick(e){
        e.preventDefault();
        setWantToAdd(true)
    }
  return (
    <button className="add-trip-button" onClick={handleClick}>
      Add a Contact
      {/* Styles */}
      <style jsx>{`
        .add-trip-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
          position: relative;
          left: 50%;
          transform: translate(-50%);
        }

        .add-trip-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </button>
  );
};

export default AddTripButton;
