import Header from "./components/Header";
import JobList from "./components/JobList";
import WorkerList from "./components/WorkerList";

import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 16px;
  gap: 10px;
`;

function App() {
  return (
    <div className="App">


      <Header name="Mini Deadline"/>

      <AppContainer>
  
          <JobList />
          <WorkerList />
       
      </AppContainer>
    </div>
  );
}

export default App;
