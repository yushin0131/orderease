import { createRoot } from 'react-dom/client';
import App from './components/App';
import Visitor from './components/visitor/Visitor'; // Visitorコンポーネントをインポート
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisitorApp from './visitor/VisitorApp';

const root = createRoot(document.getElementById('root')!);

const Index = () => {
    const clearPreRender = () => {
        const preRender = document.getElementById("pre-render");
        preRender?.remove();
        return <></>
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                {/* /visitorにアクセスした際に表示するページをVisitorコンポーネントとする。Visitorコンポーネントの呼び出し部分は実際のコンポーネント名に変えること */}
                <Route path="/visitor" element={<VisitorApp />} />
            </Routes>
            {clearPreRender()}
        </Router>
    );
}

root.render(<React.StrictMode><Index /></React.StrictMode>);
