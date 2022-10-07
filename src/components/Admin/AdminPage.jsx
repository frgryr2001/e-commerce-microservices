import { Route, Routes } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

export const AdminPage = () => {
  const activeMenu = false;

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <TooltipComponent content="Settings" position="Top">
          <button
            type="button"
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
            }}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>

      {activeMenu && (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          sidebar
        </div>
      )}
      {!activeMenu && (
        <div className="w-0 dark:bg-secondary-dark-bg ">content</div>
      )}
      <div
        className={`dark:bg-main-bg bg-main-bg min-h-screen  w-full ${
          activeMenu ? "md:ml-72" : "flex-1"
        }`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full">
          Navbar
        </div>
      </div>

      <div>
        <Routes>
          {/* DashBoard */}
          <Route index path="/" element={"Ecommerce"} />
          <Route path="/ecommerce" element={"Ecommerce"} />
          {/* Pages */}
          <Route path="/orders" element={"orders"} />
          <Route path="/employees" element={"Employees"} />
          <Route path="/customers" element={"customers"} />

          {/* Apps */}
          <Route path="/kanban" element={"kanban"} />
          <Route path="/editor" element={"editor"} />
          <Route path="/calendar" element={"calendar"} />
          <Route path="/color-picker" element={"color-picker"} />

          {/* Chart */}
          <Route path="/line" element={"line"} />
          <Route path="/area" element={"area"} />
          <Route path="/bar" element={"bar"} />
          <Route path="/pie" element={"pie"} />
          <Route path="/financial" element={"financial"} />
          <Route path="/color-mapping" element={"color-mapping"} />
          <Route path="/pyramid" element={"pyramid"} />
          <Route path="/stacked" element={"stacked"} />
        </Routes>
      </div>
    </div>
  );
};
