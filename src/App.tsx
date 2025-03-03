import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainFormWrapper from './components/form/MainFormWrapper';
import { Route, Routes } from 'react-router-dom';
import QuestionDetails from './components/questionSingle/QuestionDetails';
import Layout from './components/common/Layout';
import {JSX} from "react";

const queryClient = new QueryClient();

function App(): JSX.Element {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <Layout>
                        <Routes>
                            <Route path="/" element={<MainFormWrapper />} />
                            <Route path="/questions/:id" element={<QuestionDetails />} />
                        </Routes>
                    </Layout>
                </div>
            </QueryClientProvider>
        </>
    );
}

export default App;