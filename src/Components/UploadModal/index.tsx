import { Button, Modal } from "antd"
import { useSidebarContext } from "../../Services/Reducers/SidebarContext";
import React, { useState } from "react";
import ImageUploader from "../ImageUploader";


const UploadModal = () => {
  const { sidebarState, sidebarDispatch } = useSidebarContext();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [step, setStep] = useState(0);

  const handleCancel = () => {
    sidebarDispatch({ type: 'CLOSE_CREATE_MODAL' });
  }

  const handlePrev = () => {
    setStep(step - 1);
  }

  const handleNext = () => {
    setStep(step + 1);
  }

  const handlePost = () => {

  }

  const handleUploadImage = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader(); 
    reader.onloadend = () => { 
      setPreviewImage(reader.result as string); 
    }; 
    reader.readAsDataURL(file);
  }

  return <>
    <Modal
      title="Upload modal"
      centered
      open={sidebarState.onCreate}
      onCancel={handleCancel}
      footer={[
        <Button key="prev" onClick={handlePrev} className={!step ? "hidden" : ""}>Prev</Button>,
        <Button key="next" onClick={handleNext} className={step === 1 ? "hidden" : ""}>Next</Button>,
        <Button key="post" onClick={handlePost} className={step === 1 ? "" : "hidden"}>Post</Button>
      ]}
    >
      {
        step === 0 ? (
          <ImageUploader className="w-full aspect-square" isAvatar={false} imageSrc={previewImage ?? undefined} action={handleUploadImage} />
        ) : null
      }
      {
        step === 1 ? (
          <img src={previewImage ?? undefined} className="w-full aspect-square" alt="image" />
        ) : null
      }
    </Modal>
  </>
};

export default UploadModal;
