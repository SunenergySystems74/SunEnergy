import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    consumer: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const cardRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/send-client", formData)
      .then((response) => {
        setResponseMessage("Message sent successfully!");
      })
      .catch((error) => {
        setResponseMessage("Failed to send the message. Please try again.");
      });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in");
            // observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    // return () => {
    //   cardRefs.current.forEach((card) => observer.unobserve(card));
    // };
  }, []);

  const [displayedText, setDisplayedText] = useState("");
  const textToShow =
    "Embrace the future of energy with Sun Energy Systems. We provide innovative solar solutions for a sustainable tomorrow.";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < textToShow.length) {
        setDisplayedText((prev) => prev + textToShow.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);
  return (
    <>
      <div className="container">
        <div className="overlay folder-animation">
          <h1 className="slide-in-text">
            Sun Energy Systems: <br />
            Harnessing the Power of the Sun
          </h1>
          <p className="typewriter-text">{displayedText}</p>
        </div>
      </div>
      <section>
        <div className="container2">
          <h2>Responsive 3D Visual Experience</h2>
          <div className="content">
            <div
              className="card hidden"
              ref={(el) => (cardRefs.current[0] = el)}
            >
              <img src="/Images/3dimg2.jpg" alt="Interactive 3D Model" />
              <h3>Commercial 3D Model</h3>
              <p>
                Experience your solar project before it's built. Explore our
                interactive 3D models, view different panel configurations, and
                get a realistic sense of your system's impact.
              </p>
            </div>
            <div
              className="card hidden"
              ref={(el) => (cardRefs.current[1] = el)}
            >
              <img src="/Images/3dimg.jpg" alt="Visualization Tools" />
              <h3>Residential 3D Model</h3>
              <p>
                Our cutting-edge visualization tools bring your solar energy
                goals to life. See your system's energy production, potential
                savings, and environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Client Information Section */}
      <section>
        <div className="client-info">
          <div className="info-content">
            <h2>Why Choose Us?</h2>
            <p>
              At Sun Energy Systems, we provide tailored solar solutions that
              fit your energy needs. Our team of experts is dedicated to
              delivering the highest quality service and support.
            </p>
            <h3>Benefits of Solar Energy:</h3>
            <ul>
              <li>Reduce your electricity bills</li>
              <li>Decrease your carbon footprint</li>
              <li>Increase your property value</li>
              <li>Enjoy energy independence</li>
            </ul>
          </div>
          <div className="client-form">
            <h2>Interested in Solar Solutions? Get in Touch!</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Electricity Consumer Number</label>
                <input
                  type="number"
                  name="consumer"
                  value={formData.consumer}
                  onChange={handleChange}
                  min="0"
                  // pattern="[0-9]"
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            <p>{responseMessage}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
