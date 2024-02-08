import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("BlogForm onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector("input[name='Title']");
  const author = component.container.querySelector("input[name='Author']");
  const url = component.container.querySelector("input[name='Url']");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "Title of the new blog" },
  });

  fireEvent.change(author, {
    target: { value: "Author of the new blog" },
  });

  fireEvent.change(url, {
    target: { value: "https://new-blog.com" },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Title of the new blog");
  expect(createBlog.mock.calls[0][0].author).toBe("Author of the new blog");
  expect(createBlog.mock.calls[0][0].url).toBe("https://new-blog.com");
});
