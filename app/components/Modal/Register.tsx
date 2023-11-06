import React, { useState } from 'react';
import css from "./register.module.css";

type Props = {
  closeRegister: Function;
}

const Register = ({ closeRegister }: Props) => {
  return (
    <div className='row '>
      <div className="col-12 col-md-6 p-none">
        <div className={css.registerBlock}>
          <div>
            <button onClick={closeRegister} className={css.closeBtn}>
              <a className={css.close}></a>
            </button>
          </div>
          <div className={css.registerHeader}>
            <div className={css.logo}>
              <img src="stellar.png" alt="logo" />
            </div>
            <div className={css.text}>
              <p>Create a free account on Stellar to get access to all features.</p>
            </div>
          </div>
          <div className={css.registerForm}>
            <div className={css.form}>
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <input className="mb-none" type="password" placeholder="Confirm Password" />
            </div>
            <div className={css.description}>
              <p className='mt-none'>Pellentesque tortor enim, facilisis quis euismod et, tincidunt at neque. Integer nibh mi, tempor non cursus et, dignissim rhoncus lacus.</p>
              <p className='mt-none'>Cras mauris felis, fermentum in condimentum nec, tempor ac dolor.</p>
              <div className={css.actions}>
                <button className="mb-none">Sign Up</button>
                <a href="/login">Have an account?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;