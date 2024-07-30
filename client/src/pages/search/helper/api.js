/* Author: Sivaprakash Chittu Hariharan */
import axios from 'axios';

// default base URL for Axios
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


// api call to fetch job based on criteria
export const fetchJobs = async (params) => {
  try {
    const response = await axios.get('/api/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Error fetching jobs. Please try again later.');
  }
};
