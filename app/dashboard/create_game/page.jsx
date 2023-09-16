"use client";
import React, { useCallback, useContext, useEffect, useState } from "react"; //state
import { useDropzone } from "react-dropzone"; // dropzone for import images
import "@/public/CSS/Dashboard/Create_game.css"; //css

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image"; // <img/>

// alert
import { ToastContainer, toast } from "react-toastify"; //for alert/message
import "react-toastify/dist/ReactToastify.css"; //for alert/message css
import { MyContext } from "@/app/layout";

//image lazy loading
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Page() {
  const [images, setImages] = useState([]); //all droped image state
  const [inputValue, setInputValue] = useState({
    name: "",
    link: "",
    details: "",
    category: "",
  }); //all input state
  const { setLoading } = useContext(MyContext);

  //for hanlde input change
  function hanldeInputChange(e) {
    let name = e.target.name,
      value = e.target.value;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // for save the image droped on dropzone on images state
  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  // not allowing admin to drop more than 4 image
  useEffect(() => {
    if (images.length > 4) {
      toast.error("Can't choice more than 4 image");
      images.pop();
    }
    console.log(images);
  }, [images]);

  //don't know what
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  // remove image from images state
  const removeImage = (indexToRemove) => {
    setImages((prevImages) => {
      return prevImages.filter((_, index) => index !== indexToRemove);
    });
  };

  //handle form submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault(); // not allowing to reload page

    const formData = new FormData(); // to send on backend

    //appeding data to formData
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    formData.append("name", inputValue.name);
    formData.append("link", inputValue.link);
    formData.append("details", inputValue.details);
    formData.append("categroy", inputValue.category);
    try {
      // making request
      const response = await fetch("/api/create_game", {
        method: "POST",
        body: formData,
      });
      const data = await response.json(); //getting data

      if (data.result) {
        toast.success("Successfully Game added!"); //showing alert message if success
        setInputValue({
          name: "",
          link: "",
          details: "",
          category: "",
        });
        setImages([]);
      } else {
        toast.error("something wrong happean"); // showing error if failed
      }
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong."); // for error
      console.log(err);
      setLoading(false);
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
                  <option value="playstation">PlayStation</option>
                  <option value="nitendo">Nitendo</option>
                  <option value="sega">Sega</option>
                  <option value="xbox">XBox</option>
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
                    <LazyLoadImage
                      key={index}
                      effect="blur"
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
