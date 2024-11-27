import { useState } from 'react';

export default function AwardForm() {
  const [mode, setMode] = useState('list'); // 'list', 'add', or 'search'
  const [formData, setFormData] = useState({
    award_name: '',
    officiating_body: '',
    award_date: '',
    recipient_type: 'athlete',
    recipient_id: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setMode('list'); // Return to list view after submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Award Management</h2>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="block w-40 rounded-md border border-gray-300 px-3 py-2 text-sm 
            shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        >
          <option value="list">View List</option>
          <option value="add">Add New</option>
          <option value="search">Search</option>
        </select>
      </div>

      {/* Show form only in 'add' mode */}
      {mode === 'add' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Award Name
              </label>
              <input
                type="text"
                name="award_name"
                value={formData.award_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Officiating Body
              </label>
              <input
                type="text"
                name="officiating_body"
                value={formData.officiating_body}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Award Date
              </label>
              <input
                type="date"
                name="award_date"
                value={formData.award_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipient Type
              </label>
              <select
                name="recipient_type"
                value={formData.recipient_type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              >
                <option value="athlete">Athlete</option>
                <option value="team">Team</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {formData.recipient_type === 'athlete' ? 'Athlete ID' : 'Team ID'}
              </label>
              <input
                type="number"
                name="recipient_id"
                value={formData.recipient_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Show search interface in 'search' mode */}
      {mode === 'search' && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search awards..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500">
              Search
            </button>
          </div>
        </div>
      )}

      {/* Show list in 'list' mode */}
      {mode === 'list' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Most Valuable Player</p>
                  <p className="text-sm text-gray-500">NCAA • March 15, 2024</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-orange-600 hover:text-orange-900">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
} 