import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import instanceAxios from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
const ModalAddTask = (props) => {
    const groupId = props.groupId
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listArea, setListArea] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getAreaLocal = async () =>{
        await instanceAxios.get('area-local').then((res)=>{
            setListArea(res.data)
        }).catch((err)=>{
            messageApi.error("Có lỗi xảy ra")
        })
    }
    useEffect(()=>{
        getAreaLocal()
    },[])
    const onFinish = async (values) => {
        // messageApi.info('values '+values.area + 'grpuoid = '+groupId)
        // return 
        await instanceAxios.post(`management/add-task-to-group/${groupId}/${values.area}`
        ).then((res) => {
            messageApi.success('Thêm nhiệm vụ thành công! ');
            navigate(0)
        }).catch((err) => {
            messageApi.error('Lỗi thêm thêm nhiệm vụ')
        })
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <Button type="link" onClick={showModal}>
                Thêm nhiệm vụ
            </Button>
            <Modal title="Thêm điểm đến" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        name="area"
                        label="Khu vực:"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn khu vực cần đến"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            {
                                listArea.map((area)=>(<Select key={area.id} value={area.id} > {area.name}</Select>))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ModalAddTask;