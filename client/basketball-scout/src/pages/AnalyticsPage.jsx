import { useState } from 'react';

export default function AnalyticsPage() {
  // State for filters
  const [gameDate, setGameDate] = useState('');
  const [minWinRatio, setMinWinRatio] = useState('');
  const [minGamesPlayed, setMinGamesPlayed] = useState('');
  const [awardType, setAwardType] = useState('');
  const [minInjuryDays, setMinInjuryDays] = useState('');
  const [minTeamPoints, setMinTeamPoints] = useState('');

  // Example data - replace with actual API calls
  const topScorers = [
    { id: 1, name: "LeBron James", points: 42, game: "Lakers vs Warriors", date: "2024-03-15" },
    { id: 2, name: "Stephen Curry", points: 38, game: "Warriors vs Celtics", date: "2024-03-14" }
  ];

  const teamRatios = [
    { id: 1, name: "Boston Celtics", wins: 45, losses: 12, ratio: "0.789" },
    { id: 2, name: "Denver Nuggets", wins: 42, losses: 15, ratio: "0.737" }
  ];

  const highestScoringTeams = [
    { id: 1, name: "Sacramento Kings", totalScore: 9876, gamesPlayed: 57 },
    { id: 2, name: "Milwaukee Bucks", totalScore: 9654, gamesPlayed: 58 }
  ];

  const awardWinners = [
    { id: 1, name: "Nikola Jokic", award: "MVP", year: "2023" },
    { id: 2, name: "Jayson Tatum", award: "All-Star MVP", year: "2024" }
  ];

  const injuredPlayers = [
    { id: 1, name: "Joel Embiid", injury: "Knee", daysOut: 45 },
    { id: 2, name: "Ja Morant", injury: "Shoulder", daysOut: 30 }
  ];

  const teamAverages = [
    { id: 1, team: "Phoenix Suns", avgPoints: 118.5 },
    { id: 2, team: "Indiana Pacers", avgPoints: 117.8 }
  ];

  const handleSearch = (section, filterValue) => {
    console.log(`Searching ${section} with filter:`, filterValue);
    // Implement actual API calls here
  };

  return (
    <div className="bg-white">
      <div className="relative isolate px-8 pt-8 lg:px-10">
        <div className="mx-auto max-w-7xl py-8 sm:py-12 lg:py-14">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Basketball Analytics Hub
            </h1>
            <p className="mt-4 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Comprehensive analytics and insights for basketball performance metrics.
            </p>
          </div>

          {/* Top Scorers Section with Filter */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Game High Scorers</h2>
            <p className="mt-2 text-gray-600">Track the highest-scoring performances in individual games.</p>
            <div className="mt-4 flex gap-4">
              <input
                type="date"
                value={gameDate}
                onChange={(e) => setGameDate(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
              <button
                onClick={() => handleSearch('topScorers', gameDate)}
                className="whitespace-nowrap bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500"
              >
                Filter by Date
              </button>
            </div>
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topScorers.map((scorer) => (
                    <tr key={scorer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scorer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scorer.points}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scorer.game}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scorer.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Team Win-Loss Ratios with Filter */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Team Win-Loss Ratios</h2>
            <p className="mt-2 text-gray-600">Compare team performance based on win-loss percentages.</p>
            <div className="mt-4 flex gap-4">
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                placeholder="Minimum win ratio (e.g., 0.6)"
                value={minWinRatio}
                onChange={(e) => setMinWinRatio(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
              <button
                onClick={() => handleSearch('winRatio', minWinRatio)}
                className="whitespace-nowrap bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500"
              >
                Filter Teams
              </button>
            </div>
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Losses</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratio</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamRatios.map((team) => (
                    <tr key={team.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.wins}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.losses}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Highest Scoring Teams with Filter */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Highest Scoring Teams</h2>
            <p className="mt-2 text-gray-600">Teams ranked by total points scored across all games.</p>
            <div className="mt-4 flex gap-4">
              <input
                type="number"
                placeholder="Minimum games played"
                value={minGamesPlayed}
                onChange={(e) => setMinGamesPlayed(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
              <button
                onClick={() => handleSearch('highScoring', minGamesPlayed)}
                className="whitespace-nowrap bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500"
              >
                Filter by Games
              </button>
            </div>
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games Played</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {highestScoringTeams.map((team) => (
                    <tr key={team.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.totalScore}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.gamesPlayed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Award Winners with Filter */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Award Recipients</h2>
            <p className="mt-2 text-gray-600">Track athletes who have received notable awards and recognition.</p>
            <div className="mt-4 flex gap-4">
              <select
                value={awardType}
                onChange={(e) => setAwardType(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select Award Type</option>
                <option value="MVP">MVP</option>
                <option value="All-Star">All-Star</option>
                <option value="DPOY">Defensive Player of the Year</option>
                <option value="ROY">Rookie of the Year</option>
              </select>
              <button
                onClick={() => handleSearch('awards', awardType)}
                className="whitespace-nowrap bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500"
              >
                Filter Awards
              </button>
            </div>
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Award</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {awardWinners.map((winner) => (
                    <tr key={winner.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{winner.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.award}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Injured Players with Filter */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Extended Injuries Report</h2>
            <p className="mt-2 text-gray-600">Players who have been sidelined due to injuries for an extended period.</p>
            <div className="mt-4 flex gap-4">
              <input
                type="number"
                placeholder="Minimum days injured"
                value={minInjuryDays}
                onChange={(e) => setMinInjuryDays(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
              <button
                onClick={() => handleSearch('injuries', minInjuryDays)}
                className="whitespace-nowrap bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500"
              >
                Filter by Duration
              </button>
            </div>
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Injury</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Out</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {injuredPlayers.map((player) => (
                    <tr key={player.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.injury}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.daysOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Team Scoring Averages with Filter */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Team Scoring Averages</h2>
            <p className="mt-2 text-gray-600">Average points scored per game by each team.</p>
            <div className="mt-4 flex gap-4">
              <input
                type="number"
                placeholder="Minimum average points"
                value={minTeamPoints}
                onChange={(e) => setMinTeamPoints(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
              <button
                onClick={() => handleSearch('teamAverages', minTeamPoints)}
                className="whitespace-nowrap bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500"
              >
                Filter by Points
              </button>
            </div>
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Points</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamAverages.map((team) => (
                    <tr key={team.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.team}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.avgPoints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 