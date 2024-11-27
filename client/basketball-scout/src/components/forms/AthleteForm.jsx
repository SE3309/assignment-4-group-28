import { useState } from 'react';

export default function AthleteForm() {
  const [mode, setMode] = useState('list');
  const [formData, setFormData] = useState({
    player_name: '',
    player_number: '',
    height: '',
    weight: '',
    age: '',
    position: '',
    year: '',
    hometown: '',
    highschool: '',
    team_ID: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setMode('list');
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
        <h2 className="text-2xl font-semibold text-gray-900">Athlete Management</h2>
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

      {mode === 'add' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Player Name
              </label>
              <input
                type="text"
                name="player_name"
                value={formData.player_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Player Number
              </label>
              <input
                type="number"
                name="player_number"
                value={formData.player_number}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (ft)
              </label>
              <input
                type="number"
                step="0.1"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (lbs)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hometown
              </label>
              <input
                type="text"
                name="hometown"
                value={formData.hometown}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                High School
              </label>
              <input
                type="text"
                name="highschool"
                value={formData.highschool}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Team ID
              </label>
              <input
                type="number"
                name="team_ID"
                value={formData.team_ID}
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

      {mode === 'search' && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search athletes..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500">
              Search
            </button>
          </div>
        </div>
      )}

      {mode === 'list' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">Guard • #23 • Team ID: 1</p>
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