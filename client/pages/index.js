import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import InputTodo from "../components/inputTodo";
import ListTodos from "../components/listTodo";

const Home = () => {
  return (
    <div className="container">
      <InputTodo />
      <ListTodos />
    </div>
  );
};

export default Home;
