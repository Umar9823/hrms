import React, { useEffect, useState } from 'react';

const Sidebar = () => {
  const [navigation, setNavigation] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [newNavItem, setNewNavItem] = useState({ name: '', url: '', order: '' });

  // Fetch the navigation items from the API
  useEffect(() => {
    fetch('https://dynamic-backend-db.onrender.com/navigation/')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setNavigation(data);
      })
      .catch(error => console.error('Error fetching navigation:', error));
  }, []);

  // Toggle sidebar visibility for mobile screens
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNavItem(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new navigation item to the list
    fetch('https://dynamic-backend-db.onrender.com/navigation/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNavItem),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Navigation item added:', data);
        // Update the state with the new item
        setNavigation([...navigation, data]);
        setFormOpen(false); // Close the form after submission
      })
      .catch(error => console.error('Error adding navigation item:', error));
  };

  return (
    <div>
      {/* Mobile toggle button */}
      <div className="md:hidden p-4">
        <button 
          onClick={toggleSidebar} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        >
          {isSidebarOpen ? 'Close' : 'Open'} Menu
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block w-56 h-screen bg-gray-800 text-white`}
      >
        <div className="p-4">
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
        <div className="p-4 flex justify-end">
          <button 
            onClick={() => setFormOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          >
            Add Navigation
          </button>
        </div>
        <ul className="mt-10 space-y-4">
          {navigation.length > 0 ? (
            navigation.map((item, index) => (
              <li key={index} className="hover:bg-gray-600 p-2 ml-1 flex items-center">
                <i className={`fas fa-${item.icon} mr-3`}></i>
                <a href={item.url}>{item.name}</a>
              </li>
            ))
          ) : (
            <li className="ml-4">Loading...</li>
          )}
        </ul>
      </div>

      {/* Popup form modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Navigation Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newNavItem.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input
                  type="text"
                  name="url"
                  value={newNavItem.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Order</label>
                <input
                  type="number"
                  name="order"
                  value={newNavItem.order}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
