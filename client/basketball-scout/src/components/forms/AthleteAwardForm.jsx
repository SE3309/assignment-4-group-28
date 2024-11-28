import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AthleteAwardForm() {
  const [athletes, setAthletes] = useState([]);
  const [awards, setAwards] = useState([]);
  const [athleteAwards, setAthleteAwards] = useState([]);
  const [formData, setFormData] = useState({
    athlete_ID: '',
    award_ID: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAthletes();
    fetchAwards();
    fetchAthleteAwards();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/list/athletes');
      setAthletes(response.data.athletes);
    } catch (err) {
      console.error('Error fetching athletes:', err);
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

  const fetchAthleteAwards = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/athlete-awards');
      setAthleteAwards(response.data);
    } catch (err) {
      console.error('Error fetching athlete awards:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/api/athlete-awards', formData);
      setFormData({
        athlete_ID: '',
        award_ID: ''
      });
      fetchAthleteAwards(); // Refresh the list
    } catch (err) {
      setError('Failed to assign award to athlete');
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
        <h2 className="text-2xl font-bold text-gray-900">Assign Award to Athlete</h2>
        <p className="mt-1 text-gray-600">Associate an award with an athlete.</p>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="athlete_ID" className="block text-sm font-medium text-gray-700">
              Athlete
            </label>
            <select
              name="athlete_ID"
              id="athlete_ID"
              required
              value={formData.athlete_ID}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="">Select an athlete</option>
              {athletes.map((athlete) => (
                <option key={athlete.player_ID} value={athlete.player_ID}>
                  {athlete.player_name}
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

      {/* Existing Athlete Awards List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Existing Athlete Awards</h3>
        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Athlete</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Award</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {athleteAwards.map((aa) => (
                <tr key={`${aa.athlete_ID}-${aa.award_ID}`}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                    {athletes.find(a => a.player_ID === aa.athlete_ID)?.player_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {awards.find(a => a.award_ID === aa.award_ID)?.award_name}
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