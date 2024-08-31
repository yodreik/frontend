import Button from "../button/button";
import styles from "./header.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.logo}>welnex</div>
          <div>
            <Button
              className={styles.button}
              label="Log In"
              onClick={() => console.log("clicked log in")}
              disabled={false}
            />
            <Button
              className={styles.button}
              label="Register"
              onClick={() => console.log("clicked register")}
              disabled={false}
            />
          </div>
        </div>
      </div>
      <div className={styles.separatorContainer}>
        <hr className={styles.separator} />
      </div>
    </>
  );
};

export default Header;
