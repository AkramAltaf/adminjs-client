import React, { useEffect, useState } from "react";
import axios from "axios";
import RichTextContent from "./rich-text-content";

function BlogList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/api/resources/BlogPost/actions/list"
        );
        setBooks(response.data.records);
        console.log("Records", response.data.records);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        paddingTop: "55px",
        flexDirection: "column",
      }}
    >
      <h1>Book List Application</h1>
      <div style={{ marginTop: "34px" }}>
        {books?.map((book) => (
          <div
            key={book.id}
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              width: "500px",
              padding: "10px",
              margin: "10px",
            }}
          >
            <img src={book.params.imageUrl} alt="blog-image" />
            <h2>{book.params.title}</h2>
            <RichTextContent content={book.params.content} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
