import Header from "@/components/Header";
import { Routes, Route } from "react-router-dom";
import GetPublications from "@/components/GetPublications";
import PostPublications from "@/components/PostPublications";
const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GetPublications />} />
        <Route path="/add-publication/:id" element={<PostPublications />} />
      </Routes>
    </>
  );
};

export default Home;
