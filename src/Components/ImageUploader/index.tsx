import { Avatar } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';

interface ImageUploaderProps {
  className?: string;
  imageSrc?: string;
  action?: any;
  isAvatar?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const { className, imageSrc, action, isAvatar } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const tempData = JSON.parse(getCookie('user') || "")?.name[0];

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      action(file);
    } 
  };

  useEffect(() => {
    if(imageSrc) setPreview(imageSrc);
  }, [imageSrc]);

  return (
    <div className={className}>
      <label htmlFor="imageInput">
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: isAvatar ? '50%' : '2%',
            border: '1px solid #ccc',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {
            preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Avatar
                shape={isAvatar ? "circle" : 'square'}
                style={{ 
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#fde3cf', 
                  color: '#f56a00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700'
                }}
              >
                {isAvatar ? tempData : '+'}
              </Avatar>
            )
          }
        </div>
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;
