import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("is_login");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate("/");
    }
  };

  return (
    <button className="btn btn-error m-8 mr-16" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
