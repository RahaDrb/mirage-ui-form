import { useQuery } from 'react-query';
import axios from 'axios';

const getQuestions = async () => {
    const response = await axios.get('/api/questionTypes');
    return response.data;
};

const useTypesQuery = () => {
    return useQuery('questionTypes', getQuestions);
};
export default useTypesQuery;