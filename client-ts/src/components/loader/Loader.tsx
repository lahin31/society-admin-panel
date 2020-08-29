import React from 'react';
import './Loader.scss';

type LoaderProps = {
	width: string;
	height: string;
}

const Loader: React.FC<LoaderProps> = ({ width, height }) => {
  return (
    <div className="loading">
      <div className="loader" style={{ width, height }}></div>
    </div>
  );
};

export default Loader;