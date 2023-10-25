import React, { useState } from 'react';
import { SyntheticEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as clientAuth } from "~/firebase.client";
import { useFetcher } from "@remix-run/react";

export const Welcome = () => {

  const fetcher = useFetcher();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    try {
      const credential = await signInWithEmailAndPassword(
        clientAuth,
        email,
        password,
      );
      const idToken = await credential.user.getIdToken();

      // Trigger a POST request which the action will handle
      fetcher.submit({ idToken }, { method: "post", action: "/login" });
    } catch (e: Error) {
      // Handle errors...
      console.error(e);
    }
  }

  return (
    <div className="mainContent">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 p-none">
            <div className="left-content">
              <div className="spotify-icon">
                <i className="fab fa-spotify"></i>
              </div>
              <h1 className='captionxl'>Welcome to Stellar</h1>
              <p className="spotify-description">Discover new music and enjoy your favorite tracks.</p>
            </div>
          </div>
          <div className="col-12 col-md-6 p-none">
            <div className="welcome-container">
              <div className="text-center logo">
                <img src="stellar.png" alt="logo" />
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <input type="email" name="email" className="form-control" placeholder="Username" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend input-group-prepend-text">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    <input type="password" name="password" className="form-control" placeholder="Password" />
                  </div>
                </div>
                <div className="actions">
                  <button type="submit" className="mb-none">Login</button>
                  <a href="/login">Create an account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}