import React, { useEffect, useState } from 'react';
import { InputNumber, Modal, Select } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import instanceAxios from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
const ModalRemoveMember = (props) => {
    const groupId = props.groupId
    const [messageApi, contextHolder] = message.useMessage();
    const [listRobot,setListRobot] = useState([])
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
    const getData = async()=>{
        await instanceAxios.get('management/list-member-group/'+groupId).then((res)=>{
            const dataRes = res.data
            let tmp = []
            Object.entries(dataRes).forEach(([key, value]) => {
                tmp.push({
                    stt: Number.parseInt(key),
                    address: value
                })
              });
            setListRobot(tmp)
        }).catch((err)=>{

        })
    }
    useEffect(()=>{
        getData()
    },[])
    const onFinish = async (values) => {
        await instanceAxios.put(`management/remove-robot-from-group/${groupId}/${values.stt}`).then((res)=>{
            messageApi.success('Xóa thành công! ');
            navigate(0)
        }).catch((err)=>{
            messageApi.error('Lỗi xóa robot'+err.toString())
        })
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <>
        {contextHolder}
            <Button type="link" danger onClick={showModal}>
                Xóa thành viên
            </Button>
            <Modal title="Thêm robot" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        name="stt"
                        label="Khu vực:"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn robot cần xóa"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            {
                                listRobot.map((robot)=>(<Select key={robot.stt} value={robot.stt} > {robot.address}</Select>))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type="primary" danger ghost htmlType="submit">
                            Xóa
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ModalRemoveMember;