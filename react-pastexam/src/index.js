import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
import { Main } from './pages/Main/main';
import { NoPage } from './pages/NoPage/nopage';
import { clientId } from './credential';
import { Search } from './pages/Search/search';
import { Tmp } from './pages/Tmp/tmp';
import { Files } from './pages/Files/files';
import { MyFiles } from './pages/MyFiles/myFiles';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<Maintainance />}/> */}
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/files/:id" element={<Files />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tmp" element={<Tmp />} />
        <Route path="/myfiles" element={<MyFiles />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
{ /* <Route path="*" element={<NoPage />}/>
<Route path="/" element={<Main />} />
<Route path="/main" element={<Main />} />
<Route path="/main/:id" element={<Main/>} />
<Route path="/login" element={<Login />} />
<Route path="/upload" element={<Upload />} /> */ }
const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style.backgroundColor = '#080808';
root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>,
  // </React.StrictMode>
);

reportWebVitals();
