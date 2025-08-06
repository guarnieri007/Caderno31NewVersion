import { ReactElement } from 'react';
import { Button } from './button';
import { useLanguage } from '../../context/Language';
import { LanguageSwitcherStyles } from '../styles/common/languageSwitcher-styles';

export const LanguageSwitcher = (): ReactElement => {
  const { changeLanguage } = useLanguage();

  return (
    <LanguageSwitcherStyles>
      <Button color='secondary' handleOnClick={() => changeLanguage('en')} clicable={true}>
        EN
      </Button>
      <Button color='secondary' handleOnClick={() => changeLanguage('pt')} clicable={true}>
        PT
      </Button>
      <Button color='secondary' handleOnClick={() => changeLanguage('es')} clicable={true}>
        ESP
      </Button>
    </LanguageSwitcherStyles>
  );
};
