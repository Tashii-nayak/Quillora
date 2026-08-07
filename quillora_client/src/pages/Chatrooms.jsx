import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Chatrooms() {
  return (
    <>
      <Header />
      <section className="chatroom-join-section">
        <div className="chatroom-join-left">
          <div className="chatroom-logo">Quillora</div>
          <h1>Join <span className="italic">Quillora Chatroom</span></h1>
          <p className="offers-caption">Our available chat spaces</p>
        </div>
        <div className="chatroom-join-right">
          <h2>Submit a request to join</h2>
          <form className="chatroom-join-form">
            <input type="text" placeholder="User Name" required />
            <input type="email" placeholder="Email_id" required />
            <input type="text" placeholder="Password" required />
            <div className="form-row">
              <input type="checkbox" id="accept" required />
              <label htmlFor="accept">
                <span style={{ color: 'black' }}>I accept the </span>
                <a href="#" style={{ color: '#888' }}>Community Guidelines</a>
                <span style={{ color: 'black' }}> and </span>
                <a href="#" style={{ color: '#888' }}>Privacy Policy</a>.
              </label>
            </div>
            <button type="submit" className="submit-btn">JOIN THE CHATROOM</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
