import { useState } from "react";

function Card(props) {
  const userInfo = props.userInfo; //belongs to the user found in search result
  const userDetails = props.userDetails; //belongs to the logged in user
  const [follow, setFollow] = useState(false);


  function handleFollow(e){
    e.preventDefault();
    setFollow(!follow)

  }
  return (
    <div className="card">
      <div className="avatar"></div>
      <div className="details">
        <h2>{userInfo.name} {userInfo.last_name}</h2>
        <p>{userInfo.email}</p>
        <button 
        className={follow?"unfollow-button":"follow-button"} onClick={handleFollow}>
          {follow?"Un-follow":"Follow"}</button>
      </div>
      <style jsx>{`
        .card {
          max-width: 400px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: 20px auto;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #ccc;
          margin-bottom: 20px;
        }
        .details {
          text-align: center;
        }
        h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 1rem;
          color: #666;
        }
        .follow-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .follow-button:hover {
          background-color: #0056b3;
        }
        .unfollow-button {
          background-color: #FF5722;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .unfollow-button:hover {
          background-color: #E64A19;
        }
      `}</style>
    </div>
  );
}


export default Card;
