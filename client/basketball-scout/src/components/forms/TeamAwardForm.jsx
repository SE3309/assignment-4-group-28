import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TeamAwardForm() {
  const [teams, setTeams] = useState([]);
  const [awards, setAwards] = useState([]);
  const [teamAwards, setTeamAwards] = useState([]);
  const [formData, setFormData] = useState({
    team_ID: '',
    award_ID: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
    fetchAwards();
    fetchTeamAwards();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/list/teams');
      setTeams(response.data.teams);
    } catch (err) {
      console.error('Error fetching teams:', err);
    }
  };

  const fetchAwards = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/list/awards');
      setAwards(response.data.awards);
    } catch (err) {
      console.error('Error fetching awards:', err);
    }
  };

  const fetchTeamAwards = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/team-awards');
      setTeamAwards(response.data);
    } catch (err) {
      console.error('Error fetching team awards:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/api/team-awards', formData);
      setFormData({
        team_ID: '',
        award_ID: ''
      });
      fetchTeamAwards(); // Refresh the list
    } catch (err) {
      setError('Failed to assign award to team');
      console.error('Error assigning award:', err);
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
        <h2 className="text-2xl font-bold text-gray-900">Assign Award to Team</h2>
        <p className="mt-1 text-gray-600">Associate an award with a team.</p>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.team_ID} value={team.team_ID}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="award_ID" className="block text-sm font-medium text-gray-700">
              Award
            </label>
            <select
              name="award_ID"
              id="award_ID"
              required
              value={formData.award_ID}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="">Select an award</option>
              {awards.map((award) => (
                <option key={award.award_ID} value={award.award_ID}>
                  {award.award_name}
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
            {isLoading ? 'Assigning...' : 'Assign Award'}
          </button>
        </div>
      </form>

      {/* Existing Team Awards List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Existing Team Awards</h3>
        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Team</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Award</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {teamAwards.map((ta) => (
                <tr key={`${ta.team_ID}-${ta.award_ID}`}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                    {teams.find(t => t.team_ID === ta.team_ID)?.team_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {awards.find(a => a.award_ID === ta.award_ID)?.award_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 