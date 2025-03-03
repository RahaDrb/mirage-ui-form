import { useQuery } from 'react-query';
import axios from 'axios';

const getQuestion = async ({ queryKey }) => {
    const [id] = queryKey;
    if(!id) return null;
    const response = await axios.get(`/api/questions/${id}`);
    return response.data;
};

const useQuestionQuery = (id) => {
    return useQuery([id], getQuestion, {
        enabled: !!id
    });
};
export default useQuestionQuery;