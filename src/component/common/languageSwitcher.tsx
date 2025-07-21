import { ReactElement } from 'react';
import { Button } from './button';
import { useLanguage } from '../../context/Language';

export const LanguageSwitcher = (): ReactElement => {
  const { changeLanguage } = useLanguage();

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button color='secondary' handleOnClick={() => changeLanguage('en')} clicable={true}>
        EN
      </Button>
      <Button color='secondary' handleOnClick={() => changeLanguage('pt')} clicable={true}>
        PT
      </Button>
    </div>
  );
};
