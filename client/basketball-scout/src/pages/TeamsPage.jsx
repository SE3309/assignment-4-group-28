import { useState } from 'react';

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dummy data - replace with actual API call
  const teams = [
    {
      id: 1,
      name: "Boston Celtics",
      league: "NBA",
      wins: 45,
      losses: 12,
      standing: 1,
      location: "Boston, MA",
      record: "45-12",
      conference: "Eastern"
    },
    {
      id: 2,
      name: "Los Angeles Lakers",
      league: "NBA",
      wins: 38,
      losses: 19,
      standing: 3,
      location: "Los Angeles, CA",
      record: "38-19",
      conference: "Western"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement actual search functionality
  };

  const handleDelete = (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      console.log('Deleting team:', teamId);
      // Implement actual delete functionality
    }
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setIsEditModalOpen(true);
  };

  return (
    <div className="bg-white">
      <div className="relative isolate px-8 pt-8 lg:px-10">
        <div className="mx-auto max-w-7xl py-8 sm:py-12 lg:py-14">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Teams Directory
            </h1>
            <p className="mt-4 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              View, search, and manage team information.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-12 mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teams by name, league, or location..."
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-500"
              >
                Search
              </button>
            </div>
          </form>

          {/* Teams List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {teams.map((team) => (
                <li key={team.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xl font-medium text-gray-600">
                            {team.standing}
                          </span>
                        </div>
                        <div className="ml-4">
                          <h2 className="text-lg font-medium text-gray-900">{team.name}</h2>
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <p>{team.league}</p>
                            <p>•</p>
                            <p>{team.conference} Conference</p>
                            <p>•</p>
                            <p>Record: {team.record}</p>
                            <p>•</p>
                            <p>{team.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(team)}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(team.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                <h2 className="text-2xl font-bold mb-4">Edit Team</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Team Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      defaultValue={selectedTeam?.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      League
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      defaultValue={selectedTeam?.league}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Wins
                    </label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      defaultValue={selectedTeam?.wins}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Losses
                    </label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      defaultValue={selectedTeam?.losses}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 