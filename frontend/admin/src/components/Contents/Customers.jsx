import React from "react";
import { Table, Space, Dropdown, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, fetchAllUsers } from "../../redux/User/userSlice";
import { toast } from "react-toastify";
const Customer = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);
  const users = useSelector((state) => state.users?.users || []);

  const newUsers = users?.map((user) => {
    // format date 2022-11-18
    const date = new Date(user?.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const newDate = `${day}-${month}-${year}`;
    return {
      key: user._id,
      id: user._id,
      name: user.fullname,
      phoneNumber: user.phone,
      email: user.email,
      createAt: newDate,
    };
  });
  useEffect(() => {
    dispatch(fetchAllUsers(token));
  }, [dispatch, token]);

  const columns = [
    {
      title: "Họ & Tên",
      width: 80,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },

    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "1",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
      width: 150,
    },
    {
      title: "Ngày gia nhập",
      dataIndex: "createAt",
      key: "3",
      width: 150,
    },

    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          onClick={() => {
            Modal.confirm({
              title: "Bạn có chắc chắn muốn Ẩn người dùng này?",
              icon: <ExclamationCircleOutlined />,
              content: "Hành động này không thể hoàn tác",
              okText: "Xóa",
              okType: "danger",
              cancelText: "Hủy",
              onOk() {
                dispatch(deleteUser({ token, id: record.id, toast }));
              },
              onCancel() {
                console.log("Cancel");
              },
            });
          }}
        >
          Khóa
        </a>
      ),
    },
  ];
  return (
    <div className="min-h-screen ml-[180px] p-10">
      <h1 className="text-[35px] font-bold text-gray-700 mb-0">
        Quản Lý Khách Hàng
      </h1>
      <div className="flex mt-8">
        <Table
          columns={columns}
          dataSource={newUsers}
          scroll={{
            x: 1500,
            y: 1000,
          }}
        />
      </div>
    </div>
  );
};

export default Customer;
