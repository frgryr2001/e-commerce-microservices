import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const labels = ["Mon", "Tue", "Thu", "Fri", "Sat", "Sun"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "This Week",
      backgroundColor: "#3f52bb",
      borderColor: "#4f63d7",
      data: [0, 10, 5, 20, 20, 90],
      pointStyle: "circle",
      pointRadius: 8,
      pointHoverRadius: 10,
    },
  ],
};
const Dashboard = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);

  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div className="ml-[180px] p-10">
      <h1 className="text-[35px] font-bold text-gray-700 mb-0">Dashboard</h1>
      <h2 className="text-[18px] font-medium text-gray-500">
        Chào mừng bạn đến với trang Admin
      </h2>
      <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
        <span className="flex p-7 bg-[#FFEEE6] rounded-2xl justify-between w-full h-[180px] flex-col">
          <p className="mb-0 text-base text-gray-500">Revenue</p>
          <p className="text-[28px] text-gray-800 mb-0 font-bold">$200.0</p>
          <p className="mb-0 text-base text-gray-500">
            Tăng trưởng <span className="font-bold text-gray-800">26%</span> so
            với tuần rồi
          </p>
        </span>
        <span className="flex p-7 bg-[#FFF1D8] rounded-2xl justify-between w-full h-[180px] flex-col">
          <p className="mb-0 text-base text-gray-500">Revenue</p>
          <p className="text-[28px] text-gray-800 mb-0 font-bold">$200.0</p>
          <p className="mb-0 text-base text-gray-500">
            Tăng trưởng <span className="font-bold text-gray-800">26%</span> so
            với tuần rồi
          </p>
        </span>
        <span className="flex p-7 bg-[#F0FCED] rounded-2xl justify-between w-full h-[180px] flex-col">
          <p className="mb-0 text-base text-gray-500">Revenue</p>
          <p className="text-[28px] text-gray-800 mb-0 font-bold">$200.0</p>
          <p className="mb-0 text-base text-gray-500">
            Tăng trưởng <span className="font-bold text-gray-800">26%</span> so
            với tuần rồi
          </p>
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
