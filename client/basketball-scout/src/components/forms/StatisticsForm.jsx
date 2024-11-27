import { useState } from 'react';

export default function StatisticsForm() {
  const [mode, setMode] = useState('list');
  const [formData, setFormData] = useState({
    player_ID: '',
    match_ID: '',
    minutes_played: '',
    field_goals_made: '',
    field_goals_attempted: '',
    three_point_goals_made: '',
    three_point_goals_attempted: '',
    free_throws_made: '',
    free_throws_attempted: '',
    total_rebounds: '',
    assists: '',
    steals: '',
    blocks: '',
    turnovers: '',
    fouls: '',
    points: ''
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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Game Statistics</h2>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Player ID
              </label>
              <input
                type="number"
                name="player_ID"
                value={formData.player_ID}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Match ID
              </label>
              <input
                type="number"
                name="match_ID"
                value={formData.match_ID}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minutes Played
              </label>
              <input
                type="number"
                name="minutes_played"
                value={formData.minutes_played}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Field Goals Made
              </label>
              <input
                type="number"
                name="field_goals_made"
                value={formData.field_goals_made}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Field Goals Attempted
              </label>
              <input
                type="number"
                name="field_goals_attempted"
                value={formData.field_goals_attempted}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                3PT Made
              </label>
              <input
                type="number"
                name="three_point_goals_made"
                value={formData.three_point_goals_made}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                3PT Attempted
              </label>
              <input
                type="number"
                name="three_point_goals_attempted"
                value={formData.three_point_goals_attempted}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Free Throws Made
              </label>
              <input
                type="number"
                name="free_throws_made"
                value={formData.free_throws_made}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Free Throws Attempted
              </label>
              <input
                type="number"
                name="free_throws_attempted"
                value={formData.free_throws_attempted}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Rebounds
              </label>
              <input
                type="number"
                name="total_rebounds"
                value={formData.total_rebounds}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assists
              </label>
              <input
                type="number"
                name="assists"
                value={formData.assists}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Steals
              </label>
              <input
                type="number"
                name="steals"
                value={formData.steals}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Blocks
              </label>
              <input
                type="number"
                name="blocks"
                value={formData.blocks}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Turnovers
              </label>
              <input
                type="number"
                name="turnovers"
                value={formData.turnovers}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fouls
              </label>
              <input
                type="number"
                name="fouls"
                value={formData.fouls}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Points
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
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
              placeholder="Search statistics..."
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
                  <p className="text-sm font-medium text-gray-900">Game Statistics #123</p>
                  <p className="text-sm text-gray-500">Player ID: 456 • Match ID: 789</p>
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