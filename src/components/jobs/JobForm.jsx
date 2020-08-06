import React, { useState } from 'react';
import JobManager from '../modules/JobManager';

const JobForm = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState({
    userId: sessionUser.id,
    jobTitle: "",
    jobLocation: "",
    salaryActual: "",
    rate: "",
    requirements: "",
    jobSummary: "",
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...job };
    stateToChange[evt.target.id] = evt.target.value;
    setJob(stateToChange);
  };

  const createListing = evt => {
    evt.preventDefault();
    if (job.jobTitle === "" || job.jobLocation === "" || job.salaryActual === "" || job.rate === "" || job.requirements === "" || job.jobSummary === "") {
      window.alert("Hold up boss, you're missing a field or two!");
    } else {
      setIsLoading(true);
      JobManager.postJob(job)
        .then(() => props.history.push("/jobs"));
    }
  };

  return (
    <React.Fragment>
      <div className="statusBar">
        <img src="http://res.cloudinary.com/dhduglm4j/image/upload/v1596490037/icons/statusbar_ix00oi.png" alt="status"/>
      </div>
      <div className="listingHeader">
        <div className="jobListing__header">
          <h2>New Job Listing</h2>
        </div> 
      </div>
      <section className="editJobListing">
        <form className="editProfileForm">
          <fieldset className="editJobDetails">
            
            <label 
              className="editLabel" 
              htmlFor="jobTitle">
                Job Title *
            </label>
            <input 
              type="text"
              required
              className="editInput"  
              onChange={handleFieldChange}
              id="jobTitle"
            />
            
            <label 
              className="editLabel" 
              htmlFor="jobLocation">
                Job Location *
            </label>
            <input 
              type="text"
              required
              className="editInput"  
              onChange={handleFieldChange}
              id="jobLocation"
            />

            <div className="salaryFields">
              <div className="salaryEdit">
                <label 
                  className="editLabel" 
                  htmlFor="salaryActual">
                    Salary
                </label>
                <input 
                  type="text"
                  className="editInput"  
                  onChange={handleFieldChange}
                  id="salaryActual"
                />
              </div>
              <div className="rateEdit">
                <label 
                  className="editLabel" 
                  htmlFor="rate">
                    Rate
                </label>
                <select 
                  type="text"
                  className="editInputRate"  
                  onChange={handleFieldChange}
                  id="rate"
                >
                  <option selected disabled hidden></option>
                  <option value="Annually">Annually</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>
            </div>

            <label 
              className="editLabel" 
              htmlFor="requirements">
                Requirements
            </label>
            <textarea 
              type="text"
              className="editInputTextarea"  
              onChange={handleFieldChange}
              id="requirements"
            />

            <label 
              className="editLabel" 
              htmlFor="jobSummary">
                Job Summary *
            </label>
            <textarea 
              type="text"
              required
              className="editInputTextarea"  
              onChange={handleFieldChange}
              id="jobSummary"
            />

          </fieldset>
        </form>
      </section>
      <div className="saveEditChanges">
        <button
          type="button"
          className="blackBtn"
          id="submitBtn"
          disabled={isLoading}
          onClick={createListing}>
            Post
        </button> 
      </div>
    </React.Fragment>
  )   
};

export default JobForm