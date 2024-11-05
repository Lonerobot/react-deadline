import React, { useEffect, useState } from 'react';
import { fetchWorkers } from '../api/deadline';
import styled, { css } from 'styled-components';

const SidePanel = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px;
  border-radius: 8px;
  max-width: 500px;
  min-width: 200px;
`;

const TitleStyle = styled.h2`
  font-family: "Orbitron", sans-serif;
  letter-spacing: 0.5em; /* Increases space between letters */
  padding-left: 10px;
  text-transform : uppercase
`;

const WorkerItem = styled.div`
  font-family: "Orbitron", sans-serif;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.workerBackground};
  color: ${({ theme }) => theme.colors.secondary};
  text-transform : uppercase ;
`;

const statusMap = {
  0: { label: "Unknown", color: "white", primary: "black", secondary: "grey" },
  1: {
    label: "Rendering",
    color: "limegreen",
    primary: "green",
    secondary: "darkgreen",
    darker : "#02310b"
  },
  2: {
    label: "Idle",
    color: "#9a9d9e",
    primary: "#363637",
    secondary: "#484848",
    darker : "#292929"
  },
  4: {
    label: "Stalled",
    color: "#fb8240",
    primary: "#bb0202",
    secondary: "darkred",
    darker : "#620707"
  },
  8: {
    label: "Starting Up",
    color: "#582a0b",
    primary: "darkorange",
    secondary: "orange",
    darker : "#fa8d40"
  },
};


const StatusLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-family: "Roboto", sans-serif;
  text-transform : lowercase;
  width: 60px;
  padding: 3px 8px;
  text-align : center;
  border-radius: 4px;
  color: ${({ status }) => statusMap[status]?.color || "black"};
  background-color: ${({ status }) => statusMap[status]?.secondary || "black"};
`;

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const loadWorkers = async () => {
      const workerData = await fetchWorkers();
      console.log(workerData)
      const filteredWorkers = workerData.filter((worker) =>
        [1, 2, 4, 8].includes(worker.Status)
      );
      setWorkers(filteredWorkers);
      };

    loadWorkers();
    const intervalId = setInterval(loadWorkers, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SidePanel>
      <TitleStyle>Workers</TitleStyle>
      {workers.map((worker) => (
        <WorkerItem key={worker.WorkerId}>
          <div>{worker.Name}</div>
          <StatusLabel status={worker.Status}>
            {statusMap[worker.Status].label}
          </StatusLabel>
        </WorkerItem>
      ))}
    </SidePanel>
  );
};

export default WorkerList;
