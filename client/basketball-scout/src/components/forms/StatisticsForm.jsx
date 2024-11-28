import { useState, useEffect } from 'react';
import axios from 'axios';

export default function StatisticsForm() {
  const [athletes, setAthletes] = useState([]);
  const [games, setGames] = useState([]);
  const [statistics, setStatistics] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAthletes();
    fetchGames();
    fetchStatistics();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/athletes/list');
      setAthletes(response.data);
    } catch (err) {
      console.error('Error fetching athletes:', err);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/games');
      setGames(response.data.games || []);
    } catch (err) {
      console.error('Error fetching games:', err);
      setGames([]);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/statistics');
      setStatistics(response.data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/api/statistics', formData);
      setFormData({
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
      fetchStatistics(); // Refresh the list
    } catch (err) {
      setError('Failed to create statistics record');
      console.error('Error creating statistics:', err);
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

  const getAthleteName = (playerId) => {
    return athletes.find(athlete => athlete.player_ID === parseInt(playerId))?.player_name || 'Unknown Athlete';
  };

  const getGameDetails = (matchId) => {
    const game = games.find(game => game.match_ID === parseInt(matchId));
    if (!game) return 'Unknown Game';
    return `Game ${game.match_ID} (${new Date(game.date).toLocaleDateString()})`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Add Game Statistics</h2>
        <p className="mt-1 text-gray-600">Record player statistics for a game.</p>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="player_ID" className="block text-sm font-medium text-gray-700">
              Player
            </label>
            <select
              name="player_ID"
              id="player_ID"
              required
              value={formData.player_ID}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="">Select a player</option>
              {athletes.map((athlete) => (
                <option key={athlete.player_ID} value={athlete.player_ID}>
                  {athlete.player_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="match_ID" className="block text-sm font-medium text-gray-700">
              Game
            </label>
            <select
              name="match_ID"
              id="match_ID"
              required
              value={formData.match_ID}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="">Select a game</option>
              {games.map((game) => (
                <option key={game.match_ID} value={game.match_ID}>
                  {`Game ${game.match_ID} (${new Date(game.date).toLocaleDateString()})`}
                </option>
              ))}
            </select>
          </div>

          {/* Statistics Input Fields */}
          {Object.entries({
            minutes_played: 'Minutes Played',
            field_goals_made: 'Field Goals Made',
            field_goals_attempted: 'Field Goals Attempted',
            three_point_goals_made: '3PT Made',
            three_point_goals_attempted: '3PT Attempted',
            free_throws_made: 'Free Throws Made',
            free_throws_attempted: 'Free Throws Attempted',
            total_rebounds: 'Total Rebounds',
            assists: 'Assists',
            steals: 'Steals',
            blocks: 'Blocks',
            turnovers: 'Turnovers',
            fouls: 'Fouls',
            points: 'Points'
          }).map(([key, label]) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="number"
                name={key}
                id={key}
                min="0"
                required
                value={formData[key]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Statistics'}
          </button>
        </div>
      </form>

      {/* Recent Statistics List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Recent Statistics</h3>
        <div className="mt-4 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Player</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Game</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">MIN</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PTS</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">REB</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">AST</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">STL</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">BLK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {statistics.map((stat) => (
                <tr key={`${stat.player_ID}-${stat.match_ID}`}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                    {getAthleteName(stat.player_ID)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {getGameDetails(stat.match_ID)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.minutes_played}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.points}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.total_rebounds}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.assists}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.steals}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.blocks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
} 