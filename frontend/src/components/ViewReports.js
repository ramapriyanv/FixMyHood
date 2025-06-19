import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewReports = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("/api/issues")
      .then(res => setIssues(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Submitted Issues</h3>
      <div className="row">
        {issues.map(issue => (
          <div key={issue.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {issue.image_url && (
                <img src={issue.image_url} className="card-img-top" alt="issue" />
              )}
              <div className="card-body">
                <h5 className="card-title">{issue.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{issue.location}</h6>
                <p className="card-text">{issue.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReports;
