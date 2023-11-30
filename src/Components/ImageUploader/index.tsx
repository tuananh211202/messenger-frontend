import { Avatar } from 'antd';
import React, { ChangeEvent, useState } from 'react';

interface ImageUploaderProps {
  className?: string;
  imageSrc?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const { className, imageSrc } = props;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={className}>
      <label htmlFor="imageInput">
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid #ccc',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {
            (previewImage || imageSrc) ? (
              <img
                src={previewImage ? previewImage : imageSrc}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Avatar
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
                U
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