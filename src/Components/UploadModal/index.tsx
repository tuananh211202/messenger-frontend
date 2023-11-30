import { Button, Modal } from "antd"
import { useSidebarContext } from "../../Services/Reducers/SidebarContext";
import React, { useState } from "react";


const UploadModal = () => {
  const { sidebarState, sidebarDispatch } = useSidebarContext();

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
      abc
    </Modal>
  </>
};

export default UploadModal;