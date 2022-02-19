import React, {
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import storage from '../../utils/storage';
import utilGoogleAnalitycs from '../../utils/ga';
import { Wrapper } from './styles';

const Logout = (): ReactElement => {
  const { clear } = storage('sessionStorage');
  const history = useHistory();

  const [count, setCount] = useState<number>(5);

  useEffect(() => {
    clear();
  }, [clear]);

  useEffect(() => {
    setTimeout(() => {
      setCount((state) => (
        state > 0 ? state - 1 : state
      ));
    }, 1000);

    if (count < 1) {
      history.push('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    utilGoogleAnalitycs.setGA('page', 'logout', null);
  }, []);

  return (
    <Wrapper>
      <LoadingPage
        hasImage
        message="Estamos redirecionando você para o Login da Plataforma RUN."
        countdownMessage={`Aguarde, você será redirecionado em ${count}`}
        loading
      />
    </Wrapper>
  );
};

export default withRouter(Logout);
