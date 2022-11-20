import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const labels = ["Mon", "Tue", "Thu", "Fri", "Sat", "Sun"];

const Dashboard = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.users?.users.length);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // total all order
  const totalOrder = useSelector((state) => state.orders?.orders?.length);
  // total all price order
  const totalOrderPrice = useSelector((state) => {
    const total = state.orders?.orders?.reduce((acc, cur) => {
      if (cur.status === 1) {
        return acc + cur.total_price;
      }
      return acc;
    }, 0);
    return total;
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "This Week",
        backgroundColor: "#3f52bb",
        borderColor: "#4f63d7",
        data: [0, totalOrderPrice, 0, 0, 0, 0],
        pointStyle: "circle",
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalOrderPrice);

  return (
    <div className="ml-[180px] p-10">
      <h1 className="text-[35px] font-bold text-gray-700 mb-0">Dashboard</h1>
      <h2 className="text-[18px] font-medium text-gray-500">
        Chào mừng bạn đến với trang Admin
      </h2>
      <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
        <span className="flex p-7 bg-[#FFEEE6] rounded-2xl justify-between w-full h-[180px] flex-col">
          <p className="mb-0 text-base text-gray-500">
            TỔNG ĐƠN HÀNG TRONG NGÀY
          </p>
          <p className="text-[28px] text-gray-800 mb-0 font-bold">
            {totalOrder}
          </p>
          <p className="mb-0 text-base text-gray-500">đơn hàng</p>
        </span>
        <span className="flex p-7 bg-[#FFF1D8] rounded-2xl justify-between w-full h-[180px] flex-col">
          <p className="mb-0 text-base text-gray-500">DANH THU HÔM NAY</p>
          <p className="text-[28px] text-gray-800 mb-0 font-bold">
            {formatter}
          </p>
          <p className="mb-0 text-base text-gray-500"></p>
        </span>
        <span className="flex p-7 bg-[#F0FCED] rounded-2xl justify-between w-full h-[180px] flex-col">
          <p className="mb-0 text-base text-gray-500">TỔNG SỐ NGƯỜI DÙNG</p>
          <p className="text-[28px] text-gray-800 mb-0 font-bold">{user}</p>
          <p className="mb-0 text-base text-gray-500"></p>
        </span>
      </div>
      <h2 className="text-[25px] font-bold text-gray-700">
        Thống kê doanh thu tuần qua
      </h2>
      <div className="flex items-center justify-center w-full mt-8">
        <div className="w-full h-fit">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
