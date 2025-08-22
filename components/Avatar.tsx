import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl'
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="relative">
      {src ? (
        <>
          <img 
            src={src} 
            alt={`${name}'s avatar`}
            className={`${sizeClasses[size]} rounded-full object-cover border-2 border-slate-600`}
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLDivElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            className={`${sizeClasses[size]} rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold border-2 border-slate-600 absolute top-0 left-0`}
            style={{ display: 'none' }}
          >
            {initials}
          </div>
        </>
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold border-2 border-slate-600`}>
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;