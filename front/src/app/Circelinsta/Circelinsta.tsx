import React from 'react';
import style from './circelinsta.module.css';
import { Container } from '@mui/material';

interface CircelinstaProps {
  title: string;
  coverasli: string;
}

const Circelinsta: React.FC<CircelinstaProps> = ({ title, coverasli }) => {
  return (
    <Container>
    <div className={style.boxasli}>
      <div className={style.storycontainer1}>
        <div className={style.boxstory}>
          <div className={style.story}>
            <img src={coverasli} alt="Story" />
          </div>
          <span className={style.title}>{title}</span>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default Circelinsta;