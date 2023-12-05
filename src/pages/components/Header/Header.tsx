import style from '../../asset/css/header.module.css'
import Body from '../Body/Body';

export default function Headers() {
    return (
        <div>
        <div className={style.header}>
            <div className={style.red}></div>
            <div className={style.white}></div>
            <img src="/images/Poké_Ball_icon.png" className={style.img} alt="" /> 
            
        </div>
        <div className={style.body}><Body /></div>
        </div>
      );
  }