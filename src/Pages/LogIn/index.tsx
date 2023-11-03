import { Button, Col, Divider, Form, Input, Row, message } from "antd";
import React from "react";
import SendNowLogo from "../../Components/Logo";
import { LogInInterface } from "../../Middleware/interface/LogIn.interface";
import { logIn } from "../../Middleware/api";
import { UserStatus } from "../../Middleware/constants";
import { useNavigate } from "react-router-dom";

export const innerBoxClassName = "w-full h-fit flex justify-center border-solid ";

export const inputClassName = "w-full bg-slate-100 rounded-sm";

const LogInPage = () => {
  const navigate = useNavigate();

  const onFinish = async (logInDetails: LogInInterface) => {
    console.log(logInDetails);
    const data = await logIn(logInDetails);
    if(data.message !== UserStatus.STATUS_OK){
      message.error(data.message);
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
                <Form.Item className="p-0 m-0">
                  <Button htmlType="submit" className="w-full border-none text-white bg-blue-400 font-semibold" size="large">
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </Row>

            <Row className="w-full items-center">
              <Col span={9}>
                <Divider />
              </Col>
              <Col span={6} className="flex justify-center text-xl">
                OR
              </Col>
              <Col span={9}>
                <Divider />
              </Col>
            </Row>
            
            <Row className="w-full justify-center pb-6">
              <a href="/forgotpassword" className="font-bold">Forgot password?</a> 
            </Row>

          </Row>
        </Row>
        <Row 
          className={innerBoxClassName + "justify-center py-4"}
          style={{ borderWidth: "1px" }}
        >
          <Row className="w-fit text-base">
            Don't have an account?&nbsp;<a href="/signup" className="text-blue-600 font-semibold">Sign up</a>
          </Row>
        </Row>
      </Row>

    </Row>
  )
}

export default LogInPage;
