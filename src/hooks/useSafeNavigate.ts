import { useNavigate } from 'react-router-dom';

export function useSafeNavigate() {
  const navigate = useNavigate();

  const goBack = () => {
    // Check if there is history in the stack
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/home', { replace: true });
    }
  };

  return { goBack, navigate };
}
