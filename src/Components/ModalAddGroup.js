import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import instanceAxios from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
const ModalAddGroup = () => {
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
        await instanceAxios.post('management/add-group?group-name='+values.groupName).then((res)=>{
            messageApi.success('Thêm nhóm thành công! ');
            navigate(0)
        }).catch((err)=>{
            messageApi.error('Lỗi thêm nhóm')
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
                Thêm Nhóm
            </Button>
            <Modal title="Thêm nhóm" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        label="Tên nhóm:"
                        name="groupName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input group name!',
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
                            Thêm nhóm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ModalAddGroup;