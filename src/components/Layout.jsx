import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className="col-4"></div>
        <div className="col-4 text-center">
          <h1>FlowerIO</h1>
        </div>
        <div
          className={styles.logout + " col-4 text-end px-4 px-sm-5 fs-5"}
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
