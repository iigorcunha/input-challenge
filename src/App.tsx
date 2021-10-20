import { Home } from './pages/Home';
import GlobalStyle from './styles/global';

export function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
}
