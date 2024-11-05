import axios from 'axios';


// JobId: job._id,
// Name: job.Props.Name,
// Batch: job.Props.Batch,
// Plugin : job.Plug,
// User: job.Props.User,
// Status: job.Props.Stat, 
// IntPer: job.Props.IntPer,
// Tasks: job.Props.Tasks,

const API_BASE_URL = import.meta.env.VITE_DEADLINE_WEBSERVICE_URL

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`, {
      headers: {
       'Content-Type': 'application/json',
      },
    });

    const batchData = response.data.reduce((acc, job) => {
      const batchName = job.Props.Batch || 'Unbatched';

      let jobPercentage = Math.floor((job.CompletedChunks/job.Props.Tasks)*100)
      if(jobPercentage == null || Number.isNaN(jobPercentage)) {
        jobPercentage = 0 
      }

      const jobData = {
        JobId: job._id,
        Name: job.Props.Name,
        User: job.Props.User,
        Plugin : job.Plug,
        Status: job.Stat,
        Tasks: job.Props.Tasks,
        Errs: job.Errs,
        CompletedChunks:job.CompletedChunks,
        Percentage: jobPercentage,
      };  

      if (!acc[batchName]) {
        acc[batchName] = [];
      }
      acc[batchName].push(jobData);
      return acc;
    }, {});

    return batchData;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {};
  }
};


export const suspendJob = async (jobId) => {
  try {
    await axios.put(`${API_BASE_URL}/jobs/${jobId}/suspend`);
  } catch (error) {
    console.error('Error suspending job:', error);
  }
};

export const resumeJob = async (jobId) => {
  try {
    await axios.put(`${API_BASE_URL}/jobs/${jobId}/resume`);
  } catch (error) {
    console.error('Error resuming job:', error);
  }
};

export const deleteJob = async (jobId) => {
  try {
    await axios.delete(`${API_BASE_URL}/jobs/${jobId}`);
  } catch (error) {
    console.error('Error deleting job:', error);
  }
};

export const fetchWorkers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/slaves?Data=infosettings`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log(response.data)

    return response.data.map((worker) => ({
      Name: worker.Info.Name,
      Status: worker.Info.Stat,
    }));


  } catch (error) {
    console.error("Error fetching workers:", error);
    return [];
  }
};