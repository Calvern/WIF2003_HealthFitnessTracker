import { useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Connect to the server using Socket.IO
const socket = io("http://localhost:7001", {
    withCredentials: true,
});

const PushNotification = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for new notifications from the server
        socket.on("newNotification", (notification) => {
            console.log("New notification received:", notification);

            // Customize the toast with actions (dismiss or view)
            toast(<NotificationToast
                notification={notification}
                onView={() => navigate('/notifications')}
            />, {
                position: "top-right",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                hideProgressBar: true,
                className: "custom-toast",
            });
        });

        // Cleanup the listener when the component unmounts
        return () => {
            socket.off("newNotification");
        };
    }, [navigate]);

    return (
        <div>
            <ToastContainer />
            <style>
                {`
                    .custom-toast {
                        background-color: #f8f9fa;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        font-family: 'Arial', sans-serif;
                        padding: 16px;
                    }

                    .toast-content {
                        display: flex;
                        flex-direction: column;
                        padding-right: 12px;
                    }

                    .toast-message {
                        font-size: 14px;
                        margin-bottom: 8px;
                    }

                    .toast-actions {
                        display: flex;
                        justify-content: flex-end;
                        gap: 8px;
                    }

                    .toast-actions button {
                        padding: 6px 12px;
                        font-size: 12px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .toast-actions .btn-view {
                        background-color: #007bff;
                        color: white;
                    }

                    .toast-actions .btn-dismiss {
                        background-color: #dc3545;
                        color: white;
                    }

                    .toast-actions button:hover {
                        opacity: 0.8;
                    }
                `}
            </style>
        </div>
    );
};

// Custom toast component with options (dismiss or view)
const NotificationToast = ({ notification, onView }) => {
    const handleDismiss = () => {
        toast.dismiss();
    };

    return (
        <div className="toast-content">
            <div className="toast-message">
                <strong>{notification.title}</strong><br />
                <span>{notification.message}</span>
            </div>
            <div className="toast-actions">
                <button className="btn-view" onClick={onView}>View</button>
                <button className="btn-dismiss" onClick={handleDismiss}>Dismiss</button>
            </div>
        </div>
    );
};

export default PushNotification;
