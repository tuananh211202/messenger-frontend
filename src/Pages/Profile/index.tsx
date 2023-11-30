import { Button, Col, Form, Input, Modal, Popconfirm, Result, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { createFriendRequest, deleteFriendRequest, findByName, getRelation, updateUser, uploadImage } from "../../Middleware/api";
import { API_URI, RequestStatus, UserStatus } from "../../Middleware/constants";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import ImageUploader from "../../Components/ImageUploader";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileModal = (props: ModalProps) => {
  const { isOpen, setIsOpen } = props;
  const currentUserData = JSON.parse(getCookie('user') || "");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      name: currentUserData.name,
      username: currentUserData.username,
      description: currentUserData.description
    });
  }, [currentUserData]);

  const handleSave = async () => {
    // call save api
    const data = await updateUser(form.getFieldsValue());
    if(data.message !== UserStatus.STATUS_OK){
      message.error(data.message);
    } else {
      setIsOpen(false);
      message.success("Update profile successfully!");
    }
  } 

  return (
    <Modal
      title="Update profile"
      centered
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      width={400}
      footer={[
        <Button key='save' onClick={handleSave}>Save</Button>
      ]}
    >
      <Row className="w-full mt-5">
        <Form className="w-full" form={form}>
          <Form.Item name="name">
            <Input placeholder="name" className="w-full rounded-sm" disabled size="large" />
          </Form.Item>
          <Form.Item name="username">
            <Input placeholder="username" className="w-full rounded-sm" size="large" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea 
              className="w-full rounded-sm resize-none-imp" 
              placeholder="description" size="large" rows={4} maxLength={66} 
            />
          </Form.Item>
        </Form>
        <Row className="w-full grid justify-items-end">
          <Button type="link" className="p-0 m-0 text-base">Change password</Button>
        </Row>
      </Row>
    </Modal>
  );
}

interface RouteParams {
  name: string;
  [key: string]: string;
}

enum FriendRelation {
  Sender = 'SENDER',
  Receiver = 'RECEIVER',
  Friend = 'Friend',
  None = 'None',
  Self = 'Self'
};

enum TextOption {
  Cancel = 'Cancel',
  Accept = 'Accept',
  Remove = 'Remove',
  Add = 'Add'
}

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = useParams<RouteParams>();
  const currentUser = JSON.parse(getCookie('user') || '');
  const [pageUser, setPageUser] = useState<any>({});
  const [buttonText, setButtonText] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await findByName(name || '');
      if(data.message === UserStatus.STATUS_OK) {
        setPageUser(data.data);
      }
      const relation = (await getRelation(name || '')).relation;
      console.log(relation);
      if(relation === FriendRelation.Sender) setButtonText(TextOption.Cancel);
      else if(relation === FriendRelation.Receiver) setButtonText(TextOption.Accept);
      else if(relation === FriendRelation.Friend) setButtonText(TextOption.Remove);
      else if(relation === FriendRelation.None) setButtonText(TextOption.Add);
    })();
  },[name]);
  
  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleClick = async () => {
    switch (buttonText) {
      case TextOption.Add:
        await createFriendRequest(name || '');
        setButtonText(TextOption.Cancel);
        break;
      case TextOption.Remove:
        await deleteFriendRequest(name || '');
        setButtonText(TextOption.Add);
        break;
      case TextOption.Cancel:
        await deleteFriendRequest(name || '');
        setButtonText(TextOption.Add);
        break;
      case TextOption.Accept:
        await createFriendRequest(name || '');
        setButtonText(TextOption.Remove);
        break;
      default:
        break;
    }
  }

  const handleUploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const data = await uploadImage(formData);
    if(data.message !== RequestStatus.STATUS_OK) {
      message.error(data.message);
    } else {
      console.log(data.sublink);
      const updateUserStatus = await updateUser({ 
        avatar: data.sublink,
      });
      if(updateUserStatus.message !== UserStatus.STATUS_OK) {
        message.error(updateUserStatus.message);
      } else {
        navigate(0);
      }
    }
  }

  return (
    pageUser.name ? 
    <>
      <Row 
        style={{ marginLeft: "20%", marginRight: "20%", borderBottomWidth: "1px" }} 
        className="w-full h-fit my-6 border-solid border-slate-300 items-center"
      >
        <Col span={8} className="flex items-center justify-center">

          <ImageUploader className="w-6/12 aspect-square my-8" action={handleUploadAvatar} imageSrc={`${API_URI}/image/${currentUser.avatar}`} isAvatar={true} />

          </Col>
        <Col span={16}>
          <div className="w-full flex items-center">
            <div className="ml-2 mr-4 text-xl">{name}</div>
            {/* menu */}
            <div>
              { 
                name === currentUser.name ?
                <button className="mx-2 base-button normal-button" onClick={() => setIsOpen(true)}>Edit profile</button>
                :
                <>
                  <button 
                    className="mx-2 base-button good-button"
                    onClick={handleClick}
                  >
                    {buttonText}
                  </button>
                  <button className="mx-2 base-button normal-button">Message</button>
                </>
              }
            </div>
          </div>
          <div className="w-full flex my-4">
            <div className="ml-2 mr-4 text-base flex"><div className="font-bold text-base">2</div>&nbsp;posts</div>
            <div className="mx-4 text-base flex"><div className="font-bold text-base">6</div>&nbsp;friends</div>
            <div className="ml-4 text-base flex"><div className="font-bold text-base">10</div>&nbsp;followers</div>
          </div>
          <div className="w-9/12 mx-2 break-all text-base">{pageUser.description}</div>
        </Col>
      </Row>
      <UpdateProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
    : 
    <Result
      status="404"
      title="404"
      subTitle="Sorry, this user does not exist."
      className="w-full"
    />
  );
}

export default Profile;
