import React from 'react';
import ResumeManager from '../modules/ResumeManager';

const SchoolsCard = props => {

  const deleteSchool = id => {
    if (window.confirm("Are you sure you want to delete this school? This cannot be undone.")) {
      ResumeManager.deleteSchool(id)
      .then(() =>{
        window.location.reload(true)
      })
    }
  };


  return (
    <React.Fragment>
      <section className="experienceCard">
        <div className="titleContainer">
          <div className="jobTitle">
            <h2>{props.school.schoolName}</h2>
          </div>
          <div className="jobDetailBtnContainer">
            <div className="jobBtn__delete">
              <button 
                onClick={() => deleteSchool(props.school.id)}
                className="jobDetailDeleteBtn"
                type="button"
                >
                  &#128465;
              </button>
            </div>
            <div className="jobBtn__edit">
              <button 
                onClick={() => props.history.push(`/schools/${props.school.id}/edit`)}
                className="jobDetailEditBtn"
                type="button"
                >
                  &#9998;
              </button>
            </div>
          </div>
        </div>
        <div className="bodyContainer">
          <h3>{props.school.company}</h3>
          {(props.school.current === false)
          ? <h5>{props.school.startMonth}, {props.school.startYear} - {props.school.endMonth}, {props.school.endYear}</h5>
          : <h5>{props.school.startMonth}, {props.school.startYear} - Present</h5>}
        </div>
      </section> 




    </React.Fragment>
  )   
};

export default SchoolsCard