import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AthleteForm() {
  const [teams, setTeams] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/list/teams');
      if (response.data && response.data.teams) {
        setTeams(response.data.teams);
      } else {
        console.error('Unexpected teams data format:', response.data);
      }
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Failed to load teams');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/api/athletes', formData);
      setFormData({
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
    } catch (err) {
      setError('Failed to create athlete');
      console.error('Error creating athlete:', err);
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
        <h2 className="text-2xl font-bold text-gray-900">Add New Athlete</h2>
        <p className="mt-1 text-gray-600">Create a new athlete record.</p>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="player_name" className="block text-sm font-medium text-gray-700">
              Player Name
            </label>
            <input
              type="text"
              name="player_name"
              id="player_name"
              required
              value={formData.player_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="player_number" className="block text-sm font-medium text-gray-700">
              Jersey Number
            </label>
            <input
              type="number"
              name="player_number"
              id="player_number"
              min="0"
              value={formData.player_number}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Height (inches)
            </label>
            <input
              type="number"
              name="height"
              id="height"
              step="0.1"
              min="0"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight (lbs)
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              step="0.1"
              min="0"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              min="0"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <select
              name="position"
              id="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="">Select position</option>
              <option value="Point Guard">Point Guard</option>
              <option value="Shooting Guard">Shooting Guard</option>
              <option value="Small Forward">Small Forward</option>
              <option value="Power Forward">Power Forward</option>
              <option value="Center">Center</option>
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="number"
              name="year"
              id="year"
              min="1"
              max="5"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="hometown" className="block text-sm font-medium text-gray-700">
              Hometown
            </label>
            <input
              type="text"
              name="hometown"
              id="hometown"
              value={formData.hometown}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="highschool" className="block text-sm font-medium text-gray-700">
              High School
            </label>
            <input
              type="text"
              name="highschool"
              id="highschool"
              value={formData.highschool}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="team_ID" className="block text-sm font-medium text-gray-700">
              Team
            </label>
            <select
              name="team_ID"
              id="team_ID"
              required
              value={formData.team_ID}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="">Select team</option>
              {teams.map((team) => (
                <option key={team.team_ID} value={team.team_ID}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Athlete'}
          </button>
        </div>
      </form>
    </div>
  );
} 