"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  return (
    <>
      <form
        className="nl"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <label htmlFor="nle" className="vh">Email</label>
        <input id="nle" type="email" placeholder="Your email" autoComplete="email" required />
        <button className="btn btn-buy" type="submit">Sign up</button>
      </form>
      <p role="status" className="nl-ok">{done ? "You're on the list." : ""}</p>
    </>
  );
}
