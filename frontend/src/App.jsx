import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Landing_page from './components/landing_page';
import Weatherapp from './components/weatherapp';
import Signup from './components/signup';
import Signin from './components/signin';
import Dashboard from './components/dashboard';
import PrivateRoute from './components/privateroute';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_page />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/weather" element={<Weatherapp />} />

        {/* protected route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
