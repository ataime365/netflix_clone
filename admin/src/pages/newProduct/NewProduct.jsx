import "./newProduct.css"
import { useContext, useState } from "react";
import storage from "../../firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovieCall } from "../../context/movieContext/apiCalls";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0); // we are using this state to show upload button or create button

  const { dispatch } = useContext(MovieContext)

  const handleChange = (e) =>{
    const value = e.target.value
    setMovie({ ...movie, [e.target.name]: value }) //This is where we use the 'name' from below
  }

  // console.log(movie)
  // console.log(img)

  const upload = (items) => { //items id the list of objects to upload
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;  // To use unique file names //item.file.name
      const uploadRef = ref(storage, `items/${fileName}`) //Ref
      const uploadTask = uploadBytesResumable(uploadRef, item.file);

      // To see percentages while uploading
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is "+ progress + "% done.")
      }, (err) => {console.log(err)}, 
          // Upload completed successfully, now we can get the download URL
         () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //This is where we added the 5 urls to the movie object dictionary
           setMovie((prev) => {
             return { ...prev, [item.label]: url }
          })
          setUploaded((prev) => prev + 1 ) //Adding up the uploads to reach 5 uploaded files
        })
      }
      )
    });
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload([
      {file: img, label: "img"},
      {file: imgTitle, label: "imgTitle"},
      {file: imgSm, label: "imgSm"},
      {file: trailer, label: "trailer"},
      {file: video, label: "video"},
    ])
  };

  // console.log(movie)

  const handleSubmit = (e) =>{
    e.preventDefault()
    createMovieCall(movie, dispatch)
  }

    return (
        <div className="newProduct">
          <h1 className="addProductTitle">New Movie</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              {/* name is used for Form submission */}
              <input type="file" id="img" name="img" onChange={(e) => setImg(e.target.files[0])} />
            </div>
            <div className="addProductItem">
              <label>Title image</label>
              <input type="file" id="imgTitle" name="imgTitle" onChange={(e) => setImgTitle(e.target.files[0])} />
            </div>
            <div className="addProductItem">
              <label>Thumbnail image</label>
              <input type="file" id="imgSm" name="imgSm" onChange={(e) => setImgSm(e.target.files[0])} />
            </div>
            <div className="addProductItem">
              <label>Title</label>
              <input type="text" placeholder="John Wick" name="title" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input type="text" placeholder="description" name="desc" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Year</label>
              <input type="text" placeholder="Year" name="year" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Genre</label>
              <input type="text" placeholder="Genre" name="genre" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Duration</label>
              <input type="text" placeholder="Duration" name="duration" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Limit</label>
              <input type="text" placeholder="Limit" name="limit" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Is Series?</label>
              <select name="isSeries" id="isSeries" onChange={handleChange} >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Trailer</label>
              <input type="file" name="trailer" onChange={(e) => setTrailer(e.target.files[0])} />
            </div>
            <div className="addProductItem">
              <label>Video</label>
              <input type="file" name="video" onChange={(e) => setVideo(e.target.files[0])} />
            </div>
            {uploaded === 5 ? (
              <button className="addProductButton" onClick={handleSubmit} >Create</button>
              ) : (
                <button className="addProductButton" onClick={handleUpload} >Upload</button>
              )}
          </form>
        </div>
      );
    }