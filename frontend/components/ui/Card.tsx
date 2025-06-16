
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  titleClassName = '',
  bodyClassName = '',
  actions,
}) => {
  return (
    <div className={`bg-bg-card shadow-lg rounded-xl p-4 sm:p-6 ${className}`}>
      {title && (
        <div className={`mb-4 ${actions ? 'flex justify-between items-center' : ''}`}>
          <h2 className={`text-xl font-semibold text-primary ${titleClassName}`}>{title}</h2>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default Card;
