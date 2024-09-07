import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import instanceAxios from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
const ModalMoveRobotTo = (props) => {
    const host = props.host
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async (values) => {
        await instanceAxios.post(`management/move-robot-to-local-mark/${host}/${values.localMark}`).then((res)=>{
            messageApi.success('Robot đang di chuyển! ');
            navigate(0)
        }).catch((err)=>{
            messageApi.error('Lỗi di chuyển robot')
        })
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <>
        {contextHolder}
            <Button type="primary" onClick={showModal}>
                Path Robot
            </Button>
            <Modal title="Di chuyển robot đến LocalMark" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    style={{marginTop:'10px'}}
                        label="Local Mark:"
                        name="localMark"
                        rules={[
                            {
                                required: true,
                                message: 'Please input local mark!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Di chuyển
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ModalMoveRobotTo;