"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "@/public/CSS/Dashboard/Create_game.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
// import { uploadPhoto } from "@/actions/uploadPhoto";
//alert
import { ToastContainer, toast } from "react-toastify"; //for alert/message
import "react-toastify/dist/ReactToastify.css"; //for alert/message css

export default function Page() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState({
    name: "",
    link: "",
    details: "",
    category: "",
  });

  function hanldeInputChange(e) {
    let name = e.target.name,
      value = e.target.value;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(inputValue);
  }

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);
  useEffect(() => {
    if (images.length > 4) {
      toast.error("Can't choice more than 4 image");
      images.pop();
    }
    console.log(images);
  }, [images]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const removeImage = (indexToRemove) => {
    setImages((prevImages) => {
      return prevImages.filter((_, index) => index !== indexToRemove);
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    formData.append("name", inputValue.name);
    formData.append("link", inputValue.link);
    formData.append("details", inputValue.details);
    formData.append("categroy", inputValue.category);
    try {
      const response = await fetch("/api/create_game", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Successfully Game added!");
      } else {
        toast.error("something wrong happean");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.log(err);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="insert-game-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Insert Game</h1>
          <button
            onClick={() => {
              setInputValue({
                name: "",
                link: "",
                details: "",
                category: "",
              });
              setImages([]);
            }}
            className="reset-btn"
          >
            Reset
          </button>
        </div>
        <p style={{ color: "gray", marginBottom: "2rem" }}>
          The most important feature in the product editing section is the
          product adding part. When adding products here, do not ignore <br />
          to fill in all the required fields completely and follow the product
          adding rules.
        </p>
        <form className="game-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="insert-game-inputs">
              <label>
                <p>Game Name:</p>
                <input
                  type="text"
                  id="game-name"
                  name="name"
                  value={inputValue.name}
                  placeholder="Enter Game Name..."
                  onChange={hanldeInputChange}
                />
              </label>

              <label>
                <p>Game Description:</p>
                <textarea
                  onChange={hanldeInputChange}
                  value={inputValue.details}
                  name="details"
                  id="game-details"
                  cols="30"
                  rows="10"
                ></textarea>
              </label>

              <label>
                <p>Download Link:</p>
                <input
                  type="text"
                  onChange={hanldeInputChange}
                  id="game-link"
                  name="link"
                  value={inputValue.link}
                  placeholder="Download Link..."
                />
              </label>

              <label htmlFor="category">
                <p>Category:</p>
                <select
                  onChange={(e) => hanldeInputChange(e)}
                  name="category"
                  value={inputValue.category}
                  id="category"
                  required
                >
                  <option value="">Select</option>
                  <option value="action">Action</option>
                  <option value="adventure">Adventure</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="racing">Racing</option>
                  <option value="arcade">Arcade</option>
                  <option value="shooting">Shooting</option>
                  <option value="sports">Sports</option>
                </select>
              </label>
            </div>
            <div className="insert-game-image">
              <label>
                <p>Game Images</p>
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>
                    Drop Image or{" "}
                    <span
                      style={{ color: "blue", borderBottom: "2px solid blue" }}
                    >
                      click
                    </span>{" "}
                    to select image
                  </p>
                  <FontAwesomeIcon
                    style={{ fontSize: "25px" }}
                    icon={faDownload}
                  />
                </div>
              </label>
              <div className="image-preview-container">
                {images.slice(0, 4).map((image, index) => (
                  <div className="image-preview">
                    <Image
                      key={index}
                      width={100}
                      height={100}
                      src={URL.createObjectURL(image)}
                      alt={`Image Preview ${index}`}
                      className="image-preview"
                    />
                    <FontAwesomeIcon
                      onClick={() => removeImage(index)}
                      className="cross"
                      icon={faXmark}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />
          <button>Insert Game</button>
        </form>
      </div>
    </>
  );
}
