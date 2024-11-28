import { useState } from 'react';
import axios from 'axios';

export default function TeamForm() {
  const [formData, setFormData] = useState({
    team_name: '',
    league: '',
    wins: '',
    losses: '',
    standing: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/api/teams', formData);
      setFormData({
        team_name: '',
        league: '',
        wins: '',
        losses: '',
        standing: '',
        location: ''
      });
    } catch (err) {
      setError('Failed to create team');
      console.error('Error creating team:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Add New Team</h2>
        <p className="mt-1 text-gray-600">Create a new team record.</p>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="team_name" className="block text-sm font-medium text-gray-700">
              Team Name
            </label>
            <input
              type="text"
              name="team_name"
              id="team_name"
              required
              value={formData.team_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="league" className="block text-sm font-medium text-gray-700">
              League
            </label>
            <input
              type="text"
              name="league"
              id="league"
              value={formData.league}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="wins" className="block text-sm font-medium text-gray-700">
              Wins
            </label>
            <input
              type="number"
              name="wins"
              id="wins"
              min="0"
              value={formData.wins}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="losses" className="block text-sm font-medium text-gray-700">
              Losses
            </label>
            <input
              type="number"
              name="losses"
              id="losses"
              min="0"
              value={formData.losses}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="standing" className="block text-sm font-medium text-gray-700">
              Standing
            </label>
            <input
              type="number"
              name="standing"
              id="standing"
              min="1"
              value={formData.standing}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Team'}
          </button>
        </div>
      </form>
    </div>
  );
} 