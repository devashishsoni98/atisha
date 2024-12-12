import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EventPreview from './components/EventPreview';
import OAuthCallback from './components/callback';
import EventDetails from "./components/EventDetails.jsx";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preview" element={<EventPreview />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Route>
          <Route path="*" element={<Login />} />
          <Route path="/webex/callback" element={<OAuthCallback />}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

