import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Note } from "./note";
import { v4 } from "uuid";
import { Formik, Field, Form } from "formik";

const Home: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [temp, setTemp] = useState(false);
  useEffect(() => {
    const notesInStorage = localStorage.getItem("notes");
    if (notesInStorage) {
      setNotes(JSON.parse(notesInStorage));
    }
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("notes"));
    if (temp) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
    setTemp(true);
  }, [notes]);

  const addNote = (title: string, text: string, color: string) => {
    setNotes([
      ...notes,
      {
        id: v4().toString(),
        title: title,
        text: text,
        color: color,
        date: new Date().toLocaleDateString(),
        flag: false,
      },
    ]);
  };

  return (
    <div className="wrapper">
      <div className="header-container">
        <div className="header">
          <h1>Jared's Note Taker</h1>
        </div>
      </div>
      <div className="container">
        <div className="notes">
          <div>
            <h1>Create Notes</h1>
            <Formik
              initialValues={{ title: "", color: "", text: "" }}
              onSubmit={async (values) => {
                addNote(values.title, values.text, values.color);
              }}
            >
              <Form className="form">
                <label htmlFor="title">Title</label>
                <Field name="title" type="title" />
                <label htmlFor="text">Text</label>
                <Field
                  as="textarea"
                  name="text"
                  placeholder="Text (optional)"
                  label="Body"
                  type="text"
                />
                <button type="submit">Submit</button>
              </Form>
            </Formik>
          </div>
          <div>
            <div>
              <h1>Notes</h1>
            </div>
            <div>
              {notes.map((note) => (
                <>
                  <div>{note.title}</div>
                  <div>{note.text}</div>
                  <div>{note.date}</div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
