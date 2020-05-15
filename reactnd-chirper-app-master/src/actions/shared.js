import { getInitialData } from '../utils/api';
import recieveUsers from './users';
import recieveTweets from './tweets';
import setAuthedUser from './authedUser';

const AUTHED_ID = 'dan_abramov';

const handleInitialData = () => {
  return (dispatch) => {
    return getInitialData().then(({ users, tweets }) => {
      dispatch(recieveTweets(tweets));
      dispatch(recieveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
};

export default handleInitialData;
