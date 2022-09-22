import { useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect } from "react";

function Fileupload({ uploadImage }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imgList, setImageList] = useState([]);

  // const uploadImage = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snaphsot) => {
  //     getDownloadURL(snaphsot.ref).then((url) => {
  //       setImageList((prev) => [...prev, url]);
  //     });

  //     alert("Image Uploaded");
  //   });
  // };

  // const saveImage = () => {};

  return (
    <div>
      <input
        type='file'
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
        name='fileUpload'
        id='fileUpload'
      />

      <button onClick={(imageUpload) => uploadImage(imageUpload)}>
        Upload Image
      </button>
      {/* <button onClick={console.log(imgList.pop())}> Click for url</button> */}
    </div>
  );
}

export default Fileupload;
