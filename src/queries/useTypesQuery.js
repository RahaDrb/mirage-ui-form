import { useQuery } from 'react-query';
import axios from 'axios';

const getQuestions = async () => {
    const response = await axios.get('/api/questionTypes');
    return response.data;
};

const useTypesQuery = (shouldFetch) => {
    return useQuery(['questionTypes', shouldFetch], getQuestions, {
        enabled: shouldFetch,
    });
};
export default useTypesQuery;