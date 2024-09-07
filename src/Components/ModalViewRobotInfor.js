import React, { useState } from 'react';
import { Flex, Modal, Spin } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import instanceAxios from '../AxiosInstance';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const ModalViewRobotInfor = () => {
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
            <Button type="link" onClick={showModal}>
                Xem thông tin
            </Button>
            <Modal width={1024} title="Thông tin robot" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: 'flex', justifyContent:'center'}}>

            <Spin indicator={<LoadingOutlined spin />} spinning={true}>
                <div>
                    akakakaka
                </div>
            </Spin>
                </div>

                
            </Modal>
        </>
    );
};
export default ModalViewRobotInfor;