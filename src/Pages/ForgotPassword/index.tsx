import { Button, Form, Input, Row, Spin, message } from "antd";
import React, { useState } from "react";
import SendNowLogo from "../../Components/Logo";
import { innerBoxClassName, inputClassName } from "../LogIn";
import { getCode, getRole, recoveryPassword } from "../../Middleware/api";
import { CodeStatus, UserStatus } from "../../Middleware/constants";

const ForgetPasswordPage = () => {
  const [step, setStep] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const onFinish = async (value: any) => {
    switch (step) {
      case 0:
        setIsSending(true);
        const res1 = await getCode(value.username);
        setIsSending(false);
        if(res1.message !== UserStatus.STATUS_OK) message.error(res1.message);
        else setStep((step + 1) % 4);
        return;
      case 1:
        const res2 = await getRole(value.username, value.code);
        if(res2.message !== CodeStatus.STATUS_OK) message.error(res2.message);
        else setStep((step + 1) % 4);
        return;
      case 2:
        const res3 = await recoveryPassword(value.password);
        if(res3.message !== UserStatus.STATUS_OK) message.error(res3.message);
        else setStep((step + 1) % 4);
        return;
      case 3:
        setStep((step + 1) % 4);
        return;
    } 
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
              {
                step === 3 ? 
                <Row className="w-full text-xl mb-6 justify-center">
                    Reset password successfully!
                </Row> : null
              }
              <Form 
                className="w-full"
                onFinish={onFinish}
              >
                {
                  step === 0 ?
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
                    <Input className={inputClassName} placeholder="Enter your email" size="large" />
                  </Form.Item> : null
                }

                {
                  step === 1 ?
                  <Form.Item
                    name="code"
                    rules={[
                      {
                        required: true,
                        message: 'Please input code!',
                      }
                    ]}
                  >
                    <Input className={inputClassName} placeholder="Enter code" size="large" />
                  </Form.Item> : null
                }

                {
                  step === 2 ? <>
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
                      <Input className={inputClassName} placeholder="new password" size="large" type="password" />
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
                  </> : null
                }
                  
                {
                  step < 3 ?
                  <Form.Item className="p-0 m-0">
                    <Button htmlType="submit" disabled={isSending} className="w-full border-none text-white bg-blue-400 font-semibold mb-6" size="large">
                      {step === 0 ? 'Send Code ' : step === 1 ? 'Enter Code' : step === 2 ? 'Reset Password' : null}&nbsp;<Spin spinning={isSending} />
                    </Button>
                  </Form.Item> : null
                }
              </Form>
            </Row>

          </Row>
        </Row>
        <Row 
          className={innerBoxClassName + "justify-center py-4"}
          style={{ borderWidth: "1px" }}
        >
          <Row className="w-fit text-base">
            <a href={step < 2 ? "/login" : "/"} className="text-slate-600 font-semibold">
              {step < 2 ? "Back to Log In" : "Go to homepage"}
            </a>
          </Row>
        </Row>
      </Row>

    </Row>
  )
}

export default ForgetPasswordPage;
