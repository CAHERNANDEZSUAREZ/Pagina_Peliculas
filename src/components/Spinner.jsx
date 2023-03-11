import { FaSpinner } from 'react-icons/fa';
import styles from "./spinner.module.css"
export function Spinner(){
    return (
        <div className={styles.spinner}>
            <FaSpinner className={styles.spinning} size={30}/>
        </div>
    );
}