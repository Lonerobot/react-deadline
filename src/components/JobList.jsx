import { useEffect, useState } from "react";
import { fetchJobs } from "../api/deadline";
import styled , { keyframes } from "styled-components";
import { FiUser } from "react-icons/fi";

import { getPluginIcon } from "./IconMap";

import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const statusMap = {
  0: { label: "Unknown", color: "white", primary: "black", secondary: "grey" },
  1: {
    label: "Active",
    color: "limegreen",
    primary: "green",
    secondary: "darkgreen",
    darker : "#02310b"
  },
  2: {
    label: "Suspended",
    color: "#9a9d9e",
    primary: "#363637",
    secondary: "#484848",
    darker : "#292929"
  },
  3: {
    label: "Completed",
    color: "#30befc",
    primary: "#006bf7",
    secondary: "#0b6f90",
    darker : "#006bf7"
  },
  4: {
    label: "Failed",
    color: "#fb8240",
    primary: "#bb0202",
    secondary: "darkred",
    darker : "#620707"
  },
  6: {
    label: "Pending",
    color: "#582a0b",
    primary: "darkorange",
    secondary: "orange",
    darker : "#fa8d40"
  },
};

// Styled components
const BatchContainer = styled.div`
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.tileBackground};
  border-radius: 8px;
  padding: 1px 10px 5px 10px;

`;

const TitleStyle = styled.h2`
  font-family: "Orbitron", sans-serif;
  letter-spacing: 0.5em; /* Increases space between letters */
  padding-left: 10px;
  text-transform: uppercase;
`;

const fadeHighlight = keyframes`
  0% { background-color: #ff5804; }
  100% { background-color: transparent; }
`;

const UpdateStyle = styled.h5`
  animation: ${({ isHighlighted }) => (isHighlighted ? fadeHighlight : 'none')} 3s ease-out;
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;
  margin: 2px;
  border-radius: 6px;
  padding: 4px;
`;

const JobItem = styled.div`

`;

const IconHeading = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const UserStatus = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;  
`;

const JobInfo = styled.div`
  border-radius: 6px;
  color: ${({ status }) => statusMap[status]?.color || "black"};
  background-color: ${({ status }) => statusMap[status]?.secondary || "black"};
  margin-bottom: 6px;
  margin-left: 30px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  gap: 6px;  
`;

const BatchTitle = styled.h3`
  text-transform: uppercase;
  font-size: 1rem;
  margin: 8px;  
`;

const JobName = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusLabel = styled.span`
  font-size: 0.75rem;
  padding: 4px 6px;
  border-radius: 4px;
  text-align: center;
  width: 70px;
  color: ${({ status }) => statusMap[status]?.color || "black"};
  background-color: ${({ status }) => statusMap[status]?.primary || "black"};
`;

const UserLabel = styled.span`
  font-size: 0.75rem;
  text-align: center;
  color: ${({ status }) => statusMap[status]?.color || "black"};
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px;
  border-radius: 8px;
  max-width: 800px;

`;

const JobList = () => {
  const [batches, setBatches] = useState({});
  const [jobs, setJobs] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [highlight, setHighlight] = useState(false);

  let timeOut = 10000

  useEffect(() => {
    const loadJobs = async () => {
      const batchData = await fetchJobs();
      setBatches(batchData);
      setLastUpdated(new Date());
      setHighlight(true);
      setTimeout(() => setHighlight(false), timeOut);
    };

    loadJobs();
    const intervalId = setInterval(loadJobs, timeOut);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <TitleStyle>Render Queue</TitleStyle>
      <div>
        {Object.keys(batches).map((batchName) => (
          <BatchContainer key={batchName}>
            <BatchTitle>{batchName.replace(/_/g, " ")}</BatchTitle>
            <div className="jobs-container">
              {batches[batchName].map((job) => (
                <JobItem key={job.JobId}>
                  <JobInfo status={job.Status}>
                    <IconHeading>
                      {getPluginIcon(job.Plugin, 24)}
                      <JobName>{job.Name}</JobName>
                    </IconHeading>
                    <UserStatus>
                        <FiUser size={20} />
                        <UserLabel status={job.Status}>{job.User}</UserLabel>
                        <StatusLabel status={job.Status}>
                        {statusMap[job.Status]?.label || "Unknown"}
                        </StatusLabel>

                        <div style={{ width: 24, height: 24 }}>
                        <CircularProgressbar
                            value={job.Percentage}
                            strokeWidth={50}
                            styles={buildStyles({
                            strokeLinecap: "butt" ,
                            trailColor: statusMap[job.Status]?.darker || "black" ,
                            pathColor: statusMap[job.Status]?.primary || "black"  ,    
                            })}
                        />
                        </div>   
                    </UserStatus>
                  </JobInfo>
                </JobItem>
              ))}
            </div>
          </BatchContainer>
        ))}
      </div>
      <UpdateStyle isHighlighted={highlight} >Last Updated: {lastUpdated.toLocaleTimeString()}</UpdateStyle>
    </Container>
  );
};

export default JobList;
