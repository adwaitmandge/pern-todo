import { useState } from "react";
import useRouter from "next/router";
export default () => {
  const [description, setDescription] = useState("");

  //   http://localhost:3000/
  const url = "http://localhost:5000";
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`${url}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(await response.json());

      window.location ='/';
    } catch (error) {
      console.log("OH NO! ERROR", error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <form className="d-flex mt-5" onSubmit={submitHandler}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};
