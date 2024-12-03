import React from 'react'
import './Card.css'

const Card = ({ name, position, said , profile }) => {
    return (
      <div className="cards">
          <div className="card">
              <div className="profile">
                  <div className="img">
                      <img src={profile} alt="" />
                  </div>
                  <div className="infos">
                      Name : {name} <tr/>
                      Position : {position}
                  </div>
              </div>
              <div className="said">
                  <p>{said}</p>
              </div>
          </div>
      </div>
    )
 }

 export default Card ;