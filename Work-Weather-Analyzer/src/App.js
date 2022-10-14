import './app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { paths } from './constants';
import WorkInputContextProvider from './contexts/WorkInputContext';
import WorkDataContextProvider from './contexts/WorkDataContext';
import Home from './components/Home/Home';
import WorkForm from './components/WorkInput/WorkForm';
import WorkTable from './components/Tables/WorkTable';
import NotFound from './components/NotFound';
import ResetButton from './components/WorkInput/ResetButton';
import ResetWarningModal from './components/Modals/ResetWarningModal';
import WeatherWarningModal from './components/Modals/WeatherWarningModal';
import WorkWarningModal from './components/Modals/WorkWarningModal';
import WeatherDataContextProvider from './contexts/WeatherDataContext';
import FetchButton from './components/WeatherInput/FetchButton';
import WeatherTable from './components/Tables/WeatherTable';
import PositionInput from './components/WeatherInput/PositionInput';
import PositionContextProvider from './contexts/PositionContext';
import WeatherChart from './components/Charts/WeatherChart';
import WorkChart from './components/Charts/WorkChart';
import TitleNav from './components/Header/TitleNav';
import AuthenticationContextProvider from './contexts/AuthenticationContext';
import Account from '../src/components/Account/Account';
import RegLoginModal from './components/Modals/RegLoginModal';
import SaveWorkButton from './components/WorkInput/SaveWorkButton';
import SaveWorkModal from './components/Modals/SaveWorkModal';
import SavedWork from './components/Account/SavedWork';
import AccountSettings from './components/Account/AccountSettings';
import { UserSettingsContext } from './contexts/UserSettingsContext';
import { useContext } from 'react';
import LogoutModal from './components/Modals/LogoutModal';
import SaveLocationModal from './components/Modals/SaveLocationModal';
import RegFailedModal from './components/Modals/RegFailedModal';
import LoginFailedModal from './components/Modals/LoginFailedModal';
import { useEffect } from 'react';

function App() {
  const { darkMode } = useContext(UserSettingsContext);

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = 'var(--darkBackground)';
    } else {
      document.body.style.backgroundColor = 'var(--lightBackground)';
    }
  }, [darkMode]);

  return (
    <AuthenticationContextProvider>
      <PositionContextProvider>
        <WeatherDataContextProvider>
          <WorkDataContextProvider>
            <WorkInputContextProvider>
              <div className={darkMode ? 'dark-body' : 'light-body'}>
                <Router>
                  <TitleNav />
                  <div className='second-child-body'>
                    <div className='layout'>
                      <Switch>
                        <Route exact path={['/', paths.HOME]}>
                          <Home />
                          <RegLoginModal />
                          <RegFailedModal />
                          <LoginFailedModal />
                        </Route>
                        <Route exact path={paths.WEATHER}>
                          <PositionInput />
                          <FetchButton />
                          <WeatherTable />
                          <WeatherChart />
                          <ResetButton />
                          <WeatherWarningModal />
                          <ResetWarningModal />
                          <SaveLocationModal />
                        </Route>
                        <Route exact path={paths.WORK}>
                          <WorkForm />
                          <WorkTable />
                          <SaveWorkButton />
                          <WorkChart />
                          <ResetButton />
                          <WorkWarningModal />
                          <ResetWarningModal />
                          <SaveWorkModal />
                        </Route>
                        <Route exact path={paths.ACCOUNT}>
                          <Account />
                          <LogoutModal />
                        </Route>
                        <Route exact path={`${paths.SAVED_WORK}:location_id`}>
                          <SavedWork />
                        </Route>
                        <Route exact path={paths.SETTINGS}>
                          <AccountSettings />
                        </Route>
                        <Route>
                          <NotFound />
                        </Route>
                      </Switch>
                    </div>
                  </div>
                </Router>
              </div>
            </WorkInputContextProvider>
          </WorkDataContextProvider>
        </WeatherDataContextProvider>
      </PositionContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App;
