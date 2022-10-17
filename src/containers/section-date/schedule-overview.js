import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Table = styled.table`
  width: 100%;
  height: 450px;
  border: 2px solid #5d2e7a;
  border-radius: 6px;
  display: block;
  font-size: 16px;
  @media (min-width: 1200px) {
    font-size: 18px;
    height: 380px;
  }
`;

const Thead = styled.thead`
  display: block;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  background: #5d2e7a;

  th {
    width: 120px;
    height: 51px;
    /* height: 48px; */
    @media (min-width: 1200px) {
      height: 51px;
      width: 150px;
      margin-left: 20px;
    }
    :last-child {
      @media (min-width: 1200px) {
        transform: translateX(60px);
      }
    }
  }
`;

const Tbody = styled.thead`
  color: #5d2e7a;
  display: block;
  overflow: auto;
  height: calc(100% - 57px);
  tr {
    background: #ffffff;
    :nth-child(even) {
      background: #f0eae3;
    }
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (min-width: 1200px) {
      height: 51px;
    }
  }
  .end {
    width: 50px;
    color: #b79ac9;
    font-size: 14px;
    @media (min-width: 1200px) {
      font-size: 18px;
    }
  }
  .time {
    width: 50px;
    margin-left: 20px;
    @media (min-width: 1200px) {
      width: 150px;
    }
  }
  .group {
    display: none;
    font-size: 14px;
    padding: 0 5px;
    background-color: #f5f1f6;
    @media (min-width: 1200px) {
      display: block;
    }
  }
  .dot {
    color: #b79ac9;
    display: none;
    @media (min-width: 1200px) {
      display: block;
    }
  }
  .team {
    display: flex;
    flex-direction: column;
    width: 140px;
    @media (min-width: 1200px) {
      width: 280px;
      flex-direction: row;
    }
  }
  .group-end-wrapper {
    display: flex;
    flex-direction: column;
  }
  .group-mob {
    display: block;
    width: fit-content;
    font-size: 14px;
    background-color: #f5f1f6;
    @media (min-width: 1200px) {
      display: none;
    }
  }
`;

const ScheduleOverview = () => {
  // Fetch Data
  const [overview, setOverview] = useState([]);
  useEffect(() => {
    const fetchScheduleOverview = async () => {
      const response = await axios(
        'https://storage.googleapis.com/statics.mirrormedia.mg/json/fifa2022_overview_schedule.json'
      );
      setOverview(response?.data);
    };
    fetchScheduleOverview();
  }, []);

  return (
    <Table>
      <Thead>
        <tr>
          <th>對戰時間</th>
          <th colSpan={3}>對戰隊伍</th>
        </tr>
      </Thead>
      <Tbody>
        {overview.overview?.map((match) => {
          return (
            <tr key={match.key}>
              <td className='time'>{match.dateTime}</td>
              <td className='group'>{match.group}組</td>
              <td className='team'>
                <span>{match.team1}</span>
                <span className='dot'>・</span>
                <span>{match.team2}</span>
              </td>
              <span className='group-end-wrapper'>
                <td className='group-mob'>{match.group}組</td>
                <td className='end'>{match.ended && '結束'}</td>
              </span>
            </tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default ScheduleOverview;
