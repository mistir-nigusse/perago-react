import api from '../utils/api';

const getAllPositions = async () => {
  try {
    const response = await api.get('/getall');
    // Assuming the response contains data property
    const data = response.data;
    
    // You can now use the fetched data as needed
    console.log('Fetched data:', data.organization_hierarchy);

    return data; // Return the data if needed in the calling component
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
    throw error; // Throw the error to be handled in the calling component
  }
};
export default {
  getAllPositions,
};