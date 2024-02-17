import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [country, setCountry] = useState(''); // For filtering contacts in modal
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [page, country, onlyEven, searchTerm]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://contact.mediusware.com/api/contacts', {
        params: {
          page,
          country,
          id: onlyEven ? 'even' : '',
          search: searchTerm,
        },
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    setCountry('');
  };

  const handleModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
    setCountry('US');
  };

  const handleModalC = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50vh' }}>
        <button style={{ backgroundColor: '#46139f', margin: '0 10px' }} onClick={handleModalA}>
          All Contact
        </button>
        <button style={{ backgroundColor: '#ff7f50', margin: '0 10px' }} onClick={handleModalB}>
          US Contact
        </button>
      </div>

      {/* Modal A */}
      {showModalA && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>All Contacts</h2>
              <button className="close-btn" onClick={() => setShowModalA(false)}>
                close
              </button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="contact-list">
              {contacts.map((contact) => (
                <div key={contact.id} className="contact-item" onClick={handleModalC}>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <label htmlFor="only-even">Only even</label>
              <input
                id="only-even"
                type="checkbox"
                checked={onlyEven}
                onChange={() => setOnlyEven(!onlyEven)}
              />
              <button style={{ backgroundColor: '#46139f' }} onClick={handleModalA}>
                All Contact
              </button>
              <button className="close-btn" onClick={() => setShowModalA(false)}>
                close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal B */}
      {showModalB && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>US Contacts</h2>
              <button className="close-btn" onClick={() => setShowModalB(false)}>
                close
              </button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="contact-list">
              {contacts.map((contact) => (
                <div key={contact.id} className="contact-item" onClick={handleModalC}>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <label htmlFor="only-even">Only even</label>
              <input
                id="only-even"
                type="checkbox"
                checked={onlyEven}
                onChange={() => setOnlyEven(!onlyEven)}
              />
              <button style={{ backgroundColor: '#ff7f50' }} onClick={handleModalB}>
                All Contact
              </button>
              <button className="close-btn" onClick={() => setShowModalB(false)}>
                close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal C */}
      {showModalC && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Contact Details</h2>
              <button className="close-btn" onClick={() => setShowModalC(false)}>
                close
              </button>
            </div>
            <div className="contact-details">
              {/* Display contact details here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
