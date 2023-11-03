import { Button, Form, Input, Row, message } from "antd";
import React from "react";
import SendNowLogo from "../../Components/Logo";
import "./index.css";
import { innerBoxClassName, inputClassName } from "../LogIn";
import { SignUpInterface } from "../../Middleware/interface/SignUp.interface";
import { signUp } from "../../Middleware/api";
import { UserStatus } from "../../Middleware/constants";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const noSpaceValidation = (rule: any, value: string | string[]) => {
    if (value && value.includes(' ')) {
      return Promise.reject('Dòng văn bản không được chứa dấu cách.');
    } else {
      return Promise.resolve();
    }
  };

  const onFinish = async (signUpDetails: SignUpInterface) => {
    const data = await signUp(signUpDetails);
    if(data?.message !== UserStatus.STATUS_OK){
      message.error(data?.message);
    } else navigate("/");
  }

  return (
    <Row className="w-screen h-screen justify-center items-center">
      <Row className="w-96">
        <Row 
          className={innerBoxClassName + "mb-2"}
          style={{ borderWidth: "1px" }}
        >
          <SendNowLogo color="#000" size={35} className="my-6" />
          <Row className="px-10 w-full">

            <Row className="w-full">
              <Form 
                className="w-full"
                onFinish={onFinish}
              >
                <Form.Item 
                  name="username"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your Email!',
                    }
                  ]}
                >
                  <Input className={inputClassName} placeholder="email" size="large" />
                </Form.Item>
                <Form.Item 
                  name="password"
                  rules={[
                    {
                      min: 8,
                      message: 'Password must be at least 8 characters!',
                    },
                    {
                      required: true,
                      message: 'Please input your password!',
                    }
                  ]}
                >
                  <Input className={inputClassName} placeholder="password" size="large" type="password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input className={inputClassName} placeholder="confirm password" size="large" type="password" />
                </Form.Item>

                <Form.Item
                  name="name"
                  rules={[
                    {
                      min: 5,
                      message: 'Name must be at least 5 characters!',
                    },
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                    { validator: noSpaceValidation }
                  ]}
                >
                  <Input className={inputClassName} placeholder="display name" size="large" />
                </Form.Item>
               
                <Form.Item
                  name="description"
                  rules={[
                    {
                      min: 1,
                      message: 'Please input your description!',
                    },
                    {
                      required: true,
                      message: 'Please input your description!',
                    }
                  ]}
                >
                  <Input.TextArea 
                    className="w-full bg-slate-100 rounded-sm resize-none-imp" 
                    placeholder="description" size="large" rows={4} maxLength={66} 
                  />
                </Form.Item>

                <Form.Item className="p-0 m-0">
                  <Button htmlType="submit" className="w-full border-none text-white bg-blue-400 font-semibold mb-6" size="large">
                    Sign Up
                  </Button>
                </Form.Item>

              </Form>
            </Row>
           
          </Row>
        </Row>
        <Row 
          className={innerBoxClassName + "justify-center py-4"}
          style={{ borderWidth: "1px" }}
        >
          <Row className="w-fit text-base">
            Have an account?&nbsp;<a href="/login" className="text-blue-600 font-semibold">Login</a>
          </Row>
        </Row>
      </Row>

    </Row>
  )
}

export default SignUpPage;
