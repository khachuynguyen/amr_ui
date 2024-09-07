import React, { useEffect, useState } from 'react';

const SseTaskRobot = (props) => {
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const host = props.host
    useEffect(() => {
        // Tạo một đối tượng EventSource để kết nối với máy chủ SSE
        const eventSource = new EventSource('http://localhost:5000/stream-flux/'+host);

        // Xử lý dữ liệu khi máy chủ gửi sự kiện
        eventSource.onmessage = (event) => {
            try {
                const newData = JSON.parse(event.data);
                //  datconstaResponse = event.data
                if(!( 'isError' in newData )){
                    setError(false)
                    setData(newData)
                }
                else
                    setError(true)
            } catch (e) {
                setData('Failed to parse data.');
            }
        };

        // Xử lý lỗi kết nối
        eventSource.onerror = () => {
            setError('An error occurred while connecting to the server.');
            eventSource.close(); // Đóng kết nối khi có lỗi
        };

        // Dọn dẹp khi component bị unmount
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <>
            {
                error ? <p>Lỗi kết nối</p>:
                <>
                    {/* <p>{JSON.stringify(data) }</p> */}
                    <p>Finished_path: {JSON.stringify(data?.finished_path) }</p>
                    <p>Unfinished_path: {JSON.stringify(data?.unfinished_path) }</p>
                    <p>Target_id: {JSON.stringify(data?.target_id) }</p>
                    <p>Task_status:  {data?.task_status == 4 ? 'Hoàn thành' : (data?.task_status == 2 ? 'Đang thực hiện':(data?.task_status == 1?'Đang chờ':(data?.task_status == 5?'Lỗi':(data?.task_status == 6?'Đã hủy':'SUSPENDED'))))} </p>
                    <p>Target_point: {data?.target_point}</p>
                    {/* <p>Unfinished_path: {data.unfinished_path}</p> */}
                </>
            }
        </>
    );
};

export default SseTaskRobot;
