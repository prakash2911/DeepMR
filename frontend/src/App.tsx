import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import TeaLeafImage from "./assets/tea-leaf.png";
import "./App.css";

const modelsData = [
  {
    name: "Logistic Regression",
    image: "",
    accuracy : "81.92955589586524",
    description:
      "Logistic regression is a statistical machine learning technique for predicting the probability of discrete outcomes, commonly used for binary classification problems where the target variable can take only two values (0 or 1).",
  },
  {
    name: "Random Forest",
    image: "",
    accuracy : " 86.06431852986218",
    description:
      "Random forest is an ensemble machine learning technique that operates by constructing a multitude of decision trees during training and outputting the class that is the mode of the classes predicted by individual trees.",
  },
  {
    name: "SVM",
    image: "",
    accuracy : "82.23583460949465",
    description:
      "Support Vector Machine (SVM) is a supervised machine learning algorithm that is widely used for classification and regression tasks. SVM has proven to be effective in a variety of applications, including image classification, text classification, and bioinformatics.",
  },
  {
    name: "KNN",
    image: "",
    accuracy : "68.75957120980092",
    description:
      "K-Nearest Neighbors (KNN) is a simple and intuitive machine learning algorithm used for both classification and regression tasks. It is a non-parametric and instance-based learning algorithm, meaning it doesn't make explicit assumptions about the underlying data distribution and instead relies on the proximity of data points in the feature space.",
  },
  {
    name: "NaiveBayes",
    image: "",
    accuracy : "0.522205",
    description:
      "Naive Bayes is a probabilistic machine learning algorithm based on Bayes' theorem, which is a fundamental principle in probability theory.",
  },
  {
    name: "CNN",
    image: "",
    accuracy : "0.974619",
    description:
      "Convolutional Neural Networks (CNNs) are a class of deep learning models designed specifically for processing structured grid data, such as images.CNNs are characterized by their ability to automatically and adaptively learn spatial hierarchies of features directly from the input data.",
  },
  {
    name: "CNN ResNet v2	",
    image: "",
    accuracy : "0.987310",
    description:
      "ResNet (Residual Networks) is a type of Convolutional Neural Network (CNN) architecture that was introduced to address the challenges of training very deep neural networks.The primary innovation of ResNet is the use of residual blocks, which allow the training of extremely deep networks while mitigating the vanishing gradient problem. ",
  },
  {
    name: "CNN VGG16	",
    image: "",
    accuracy : "0.972081",
    description:
      "VGG16 is a convolutional neural network architecture that was proposed by the Visual Graphics Group (VGG) at the University of Oxford.VGG16 is part of a series of VGG architectures, and the number 16 in its name refers to the total number of weight layers in the network.",
  },
];

function App() {
  const [image, setImage] = useState<any>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const detectSectionRef = useRef<HTMLDivElement>(null);

  const [prediction, setPrediction] = useState<any>(null);

  return (
    <div className="App">
      <header>
        <a href="#" className="brand">
          Brain Tumor Detection
        </a>
        <div className="menu-btn"></div>
        <div className="navigation">
          <div className="navigation-items">
            <a>HOME</a>
            <a
              onClick={() =>
                aboutSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              ABOUT
            </a>
            <a
              onClick={() =>
                detectSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              DETECT
            </a>
            <a href="#">
              <FiSearch />
            </a>
          </div>
        </div>
      </header>
      <section className="home">
        <div className="content">
          <h1>
            Detection of Brain Tumors<br></br>
            <span>Using MRI</span>
          </h1>
          <p>
            The accurate and timely diagnosis of brain tumors is crucial for effective treatment and patient care. 
            With advancements in medical imaging and computational techniques, deep learning has emerged as 
            a powerful tool for automating the classification of brain tumor types. 
            This project focuses on leveraging deep learning models, particularly through the application of transfer learning, 
            to enhance the predictive accuracy of brain tumor classification.<br></br>
            <br></br>
            Brain tumors, diverse in their histological and molecular characteristics, 
pose a significant challenge in terms of accurate identification and differentiation. 
Traditional diagnostic methods heavily rely on the expertise of 
radiologists and pathologists, often leading to subjective interpretations and potential misdiagnoses. 
The integration of deep learning into this domain offers a promising solution by automating the process of tumor classification based on medical imaging data.
          </p>
          <a
            onClick={() =>
              detectSectionRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            PREDICT
          </a>
        </div>
      </section>
      <section className="models-employed">
        <h1>MODELS EMPLOYED FOR THE PROJECT</h1>
        <div className="models-container">
          {modelsData.map((item: any, index: number) => (
            <div className="model" key={index}>
              <div className="model-image">
                {item.image && <img src={item.image} alt={item.name} />}
              </div>
              
              <div className="model-name">{item.name}</div>
              <div className="accuracy">
                <b>Accuracy </b> : {item.accuracy}
              </div>
              <div className="model-description">{item.description}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="models-employed" ref={detectSectionRef}>
        <h1>TRY IT OUT</h1>
        Upload an image to make predictions
        <div className="predictions-container">
          <div className="predicitons-top-container">
            <div className="choose-file-container">
              <label htmlFor="file-upload" className="custom-file-upload">
                Upload Image
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={(event) => {
                  setImage(event.target.files![0]);
                  setPrediction(null);
                }}
              />
              {image && <p>{image.name}</p>}
            </div>
            {prediction && (
              <div className="choose-file-container">
                <label className="custom-file-upload">
                  {prediction.prediction}
                </label>
                <p>{(prediction.confidence * 10).toFixed(2)} %</p>
              </div>
            )}
          </div>
          {image && (
            <>
              <img
                src={URL.createObjectURL(image)}
                className="uploaded-image"
              />
              <div
                className="button"
                onClick={() => {
                  const formData = new FormData();
                  formData.append("image", image);

                  fetch("http://localhost:5000/", {
                    method: "POST",
                    body: formData,
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      // Handle the response data
                      console.log(data);
                      setPrediction(data);
                    })
                    .catch((error) => {
                      // Handle the error
                      console.error(error);
                    });
                }}
              >
                <p>Make Prediction</p>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="about" ref={aboutSectionRef}>
        <img src={TeaLeafImage} />
        <div className="about-content">
          <h1>ABOUT US</h1>
          <p>
          This project aims to develop an automated brain tumor classification system to assist radiologists in analyzing MRI scans. 
          The system uses a deep convolutional neural network (CNN) architecture called VGG16 pretrained on natural images as a base model. 
          Transfer learning is applied by using this CNN to extract meaningful features from MRI images and training a new classifier layer specialized for tumor types. 
          The classes include no tumor, glioma, meningioma, pituitary tumor and others.
          A web interface is built using ReactJS for the front-end to allow radiologists to upload scans and view classifications. 
          The backend API is developed in Flask to serve predictions from the VGG16 model.
          </p>
          <div className="button">
            <p>Github Link</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
