import React, { useEffect, useState } from 'react';

const SseRobotInforComponent = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const host = props.host
    useEffect(() => {
        // Tạo một đối tượng EventSource để kết nối với máy chủ SSE
        const eventSource = new EventSource('http://localhost:5000/stream-flux/'+host);

        // Xử lý dữ liệu khi máy chủ gửi sự kiện
        eventSource.onmessage = (event) => {
            try {
                // const newData = JSON.parse(event.data);
                setData(event.data);
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
        <p>{data}</p>
    );
};

export default SseRobotInforComponent;
