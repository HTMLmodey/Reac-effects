import React, { useState, useEffect } from 'react';
import { useCallbackLoading } from './useCallbackLoading';
import { AsyncFunctionWithLoading } from './types';

const DataProvider = {
  User: {
    submitAnswer: (code: string, b: string) => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(`Answer submitted with code: ${code} and b: ${b}`);
        }, 2000);
      });
    },
  },
};

const UserComponent: React.FC = () => {
  const sbm = useCallbackLoading(
    'submit_answer',
    (code: string, a: string, b: string) => DataProvider.User.submitAnswer(code, b),
    []
  ) as AsyncFunctionWithLoading<(code: string, a: string, b: string) => Promise<string>>;

  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleSubmit = () => {
    sbm('someCode', 'aValue', 'bValue')
      .then((result) => {
        console.log('Submit completed', result);
        setLoadingComplete(true);
      })
      .catch((error) => {
        console.error('Submit failed', error);
      });
  };

  useEffect(() => {
    if (loadingComplete) {
      const timer = setTimeout(() => {
        setLoadingComplete(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loadingComplete]);

  return (
    <div>
      <button onClick={handleSubmit}>Отправить ответ</button>
      {sbm.loading && <p>Загрузка...</p>}
      {loadingComplete && <p>Загрузка завершена!</p>}
    </div>
  );
};

export default UserComponent;