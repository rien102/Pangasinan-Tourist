import React, { useState } from "react";
import "./App.css";
import logo from "./images/Pangasinan Logo.png";

const destinations = [
  {
    id: 1,
    title: "Hundred Islands National Park",
    place: "Alaminos City, Pangasinan",
    category: "Nature",
    image:
      "https://outoftownblog.com/wp-content/uploads/2017/05/Hundred-Islands-Christ-the-Redeemer-Statue-by-AntonNawalangMalay-via-Wikimedia-cc.jpg",
    text: "Iconic marine sanctuary featuring 123 lush limestone islands, emerald waters, white-sand beaches, and scenic spots like Pilgrimage Island's majestic Christ statue.",
  },

  {
    id: 2,
    title: "Manaog Church ",
    place: "Manaog, Pangasinan",
    category: "Heritage",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxG1jhVT47-AKWohyuovLpzjiKw3UKe32meKGE55q2KLqF2RCmiQ_5PAU&s=10",
    text: "Visit the historic Manaoag Church, a famous pilgrimage site in Pangasinan known for its beautiful architecture, rich religious heritage, and devotion to Our Lady of the Rosary of Manaoag.",
  },

  {
    id: 3,
    title: "Malico Viewpoint",
    place: "San Nicolas, Pangasinan",
    category: "Nature",
    image:"https://seepangasinan.com/wp-content/uploads/2022/09/IMG_2778-scaled.jpg",
    text: "Enjoy stunning mountain views and peaceful scenery in Malico, Pangasinan.",
  },
];

function App() {
  const [active, setActive] = useState("home");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState(null);

  const changePage = (page) => {
    setActive(page);
    setShowMenu(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const results = destinations.filter((item) => {
    const text = keyword.toLowerCase().trim();

    const foundText =
      item.title.toLowerCase().includes(text) ||
      item.place.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text);

    const foundCategory =
      category === "All" ||
      item.category === category;

    return foundText && foundCategory;
  });

  return (
    <div className="website">

      {/* ================= HEADER ================= */}

      <header className="header">
        <div className="header-inner">

          <button
            className="brand"
            onClick={() => changePage("home")}
          >
            <img
              src={logo}
              alt="Pangasinan Heritage Logo"
            />

            <div>
              <strong>Pangasinan</strong>
            </div>
          </button>

          <nav
            className={
              showMenu
                ? "navigation show"
                : "navigation"
            }
          >

            <button
              className={
                active === "home"
                  ? "current"
                  : ""
              }
              onClick={() => changePage("home")}
            >
              Home
            </button>

            <button
              className={
                active === "sites"
                  ? "current"
                  : ""
              }
              onClick={() => changePage("sites")}
            >
              Heritage Sites
            </button>

            <button
              className={
                active === "about"
                  ? "current"
                  : ""
              }
              onClick={() => changePage("about")}
            >
              About
            </button>

            <button
              className={
                active === "contact"
                  ? "current"
                  : ""
              }
              onClick={() => changePage("contact")}
            >
              Contact
            </button>

          </nav>

          <div className="header-actions">

            <div className="header-search">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setActive("sites");
                }}
              />
            </div>

            <button
              className="hamburger"
              onClick={() =>
                setShowMenu(!showMenu)
              }
              aria-label="Open menu"
            >
              ☰
            </button>

          </div>

        </div>
      </header>


      {/* ================= HOME ================= */}

      {active === "home" && (
        <>
          <section className="hero-section">

            <div className="hero-shade"></div>

            <div className="hero-inner">

              <div className="hero-content">

                <span className="eyebrow">
                  SEE THE BEAUTY OF PANGASINAN
                </span>

                <h1>
                  Explore Pangasinan’s
                  <br />
                  <em>
                    Cultural Heritage
                  </em>
                </h1>

                <p>
                  Explore the stunning landscapes, historic landmarks, rich culture, and unforgettable destinations of Pangasinan.
                </p>

                <button
                  className="main-btn"
                  onClick={() => changePage("sites")}
                >
                  Explore Heritage Sites
                  <b>→</b>
                </button>

              </div>

            </div>

          </section>


          <DestinationSection
            data={results}
            category={category}
            setCategory={setCategory}
            setSelected={setSelected}
            keyword={keyword}
          />


          <AboutSection />
        </>
      )}


      {/* ================= SITES ================= */}

      {active === "sites" && (
        <main>
          <DestinationSection
            data={results}
            category={category}
            setCategory={setCategory}
            setSelected={setSelected}
            keyword={keyword}
          />
        </main>
      )}


      {/* ================= ABOUT ================= */}

      {active === "about" && (
        <AboutSection />
      )}


      {/* ================= CONTACT ================= */}

      {active === "contact" && (
        <ContactSection />
      )}


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-inner">

          <div>
            <h3>
              Pangasinan Heritage
            </h3>

            <p>
              Explore. Discover. Preserve.
            </p>
          </div>

          <div className="footer-menu">
            <span>Heritage</span>
            <span>Culture</span>
            <span>Explore</span>
          </div>

        </div>

        <div className="footer-bottom">
        © 2026 Pangasinan Heritage. Discover, explore, and celebrate Pangasinan.
        </div>

      </footer>


      {/* ================= MODAL ================= */}

      {selected && (
        <div
          className="overlay"
          onClick={() => setSelected(null)}
        >

          <div
            className="details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelected(null)
              }
            >
              ×
            </button>

            <img
              src={selected.image}
              alt={selected.title}
            />

            <div className="modal-info">

              <span className="modal-category">
                {selected.category}
              </span>

              <h2>
                {selected.title}
              </h2>

              <p className="modal-place">
                📍 {selected.place}
              </p>

              <p>
                {selected.text}
              </p>

              <button
                className="main-btn"
                onClick={() =>
                  setSelected(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


/* =====================================================
   DESTINATION SECTION
===================================================== */

function DestinationSection({
  data,
  category,
  setCategory,
  setSelected,
  keyword,
}) {
  return (
    <section className="destination-section">

      <div className="heading">

        <span>EXPLORE</span>

        <h2>
          Heritage Sites
        </h2>

        <p>
          Experience the beauty, history, and cultural treasures of Pangasinan.
        </p>

      </div>


      <div className="site-controls">

        <div className="site-search">
          <span>🔍</span>

          <input
            type="text"
            value={keyword}
            placeholder="Search a destination..."
            readOnly
          />
        </div>


        <div className="categories">

          {[
            "All",
            "Nature",
            "Heritage",
          ].map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>
          ))}

        </div>

      </div>


      {data.length === 0 ? (

        <div className="empty">

          <h3>
            No destination found
          </h3>

          <p>
            Try another search.
          </p>

        </div>

      ) : (

        <div className="destination-grid">

          {data.map((item) => (

            <article
              className="destination-card"
              key={item.id}
            >

              <div className="destination-photo">

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />

                <span>
                  {item.category}
                </span>

              </div>


              <div className="destination-info">

                <h3>
                  {item.title}
                </h3>

                <p className="place">
                  📍 {item.place}
                </p>

                <p className="description">
                  {item.text}
                </p>

                <button
                  className="view-button"
                  onClick={() =>
                    setSelected(item)
                  }
                >
                  View Details
                  <span>→</span>
                </button>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>
  );
}


/* =====================================================
   ABOUT
===================================================== */

function AboutSection() {
  return (
    <section className="about-section">

      <div className="about-inner">

        <div className="heading">

          <span>
            ABOUT THE PROJECT
          </span>

          <h2>
            Protecting Pangasinan’s
            <br />
            Heritage for Future Generations
          </h2>

          <p>
           Pangasinan Heritage is a digital platform that celebrates the province’s stunning 
           destinations, historic landmarks, 
           and diverse cultural heritage.
          </p>

        </div>


        <div className="statistics">

          <div>
            <strong>03</strong>
            <span>
              Featured Destinations
            </span>
          </div>

          <div>
            <strong>01</strong>
            <span>
               Unified Digital Platform
              </span>
            </div>

            <div>
              <strong>100+</strong>
              <span>
                Historic Landmarks
              </span>
            </div>

          </div>

        </div>

      </section>
    );
  }


/* =====================================================
   CONTACT
===================================================== */

function ContactSection() {

  const [success, setSuccess] =
    useState(false);

  const sendMessage = (e) => {
    e.preventDefault();

    setSuccess(true);

    e.target.reset();
  };

  return (
    <section className="contact-section">

      <div className="contact-inner">

        <div className="contact-text">

      
          <h2>
            Contact Us
          </h2>

          <p>
           Have questions, suggestions, or stories about Pangasinan? 
           We’d love to hear from you. Send us a message!
          </p>


          <div className="contact-item">

            <b>
              ✉ Email
            </b>

            <p>
              heritage@pangasinan.com
            </p>

          </div>


          <div className="contact-item">

            <b>
              📍 Location
            </b>

            <p>
              Pangasinan, Philippines
            </p>

          </div>

        </div>


        <form
          className="contact-box"
          onSubmit={sendMessage}
        >

          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Your name"
            required
          />


          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Your email"
            required
          />


          <label htmlFor="message">
            Message
          </label>

          <textarea
            id="message"
            rows="6"
            placeholder="Write your message..."
            required
          />


          <button
            type="submit"
            className="main-btn"
          >
            Send Message →
          </button>


          {success && (
            <p className="success-message">
              ✓ Your message was sent successfully!
            </p>
          )}

        </form>

      </div>

    </section>
  );
}

export default App;