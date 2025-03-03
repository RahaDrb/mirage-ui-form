import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import MainFormWrapper from "./components/form/MainFormWrapper";
import {Route, Routes} from "react-router-dom";
import QuestionDetails from "./components/questionSingle/QuestionDetails";
import Layout from "./components/common/Layout";

const queryClient = new QueryClient();

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <Layout>
                        <Routes>
                            <Route path="/" element={<MainFormWrapper/>}/>
                            <Route path="/questions/:id" element={<QuestionDetails/>}/>
                        </Routes>
                    </Layout>
                </div>
                <ReactQueryDevtools initialOpen={false}/>

            </QueryClientProvider>
        </>
    );
}

export default App;
