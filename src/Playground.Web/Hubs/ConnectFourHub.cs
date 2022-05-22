using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Playground.Web.Hubs.Clients;
using Playground.Web.Models.ConnectFour;

using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Playground.Web.Hubs
{
    public class ConnectFourHub : Hub<IConnectFourClient>
    {
        private static readonly ConcurrentDictionary<string, List<UserConnection>> _games = new ConcurrentDictionary<string, List<UserConnection>>();

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionId = Context.ConnectionId;

            var gameCode = string.Empty;
            foreach (var game in _games)
            {
                if (game.Value.Any(userConn => userConn.ConnectionId == connectionId))
                {
                    gameCode = game.Key;
                }
            }

            if (gameCode != string.Empty)
            {
                _games.Remove(gameCode, out var users);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task StartGame(StartGameRequest startGameRequest)
        {
            StartGameResponse startGameResponse;
            var connectionId = Context.ConnectionId;
            if (_games.TryGetValue(startGameRequest.GameCode, out var users))
            {
                if (users.Count == 2)
                {
                    startGameResponse = new StartGameResponse
                    {
                        Valid = false,
                        Waiting = true
                    };
                }
                else if (users.Count == 1)
                {
                    var alreadyStarted = users.Any(u => u.User == startGameRequest.User);
                    if (alreadyStarted)
                    {
                        startGameResponse = new StartGameResponse
                        {
                            Valid = true,
                            Waiting = true
                        };
                    }
                    else
                    {
                        startGameResponse = new StartGameResponse
                        {
                            Valid = true,
                            Waiting = false
                        };
                        users.Add(new UserConnection(startGameRequest.User, connectionId));
                    }
                }
                else
                {
                    throw new ArgumentException();
                }
            }
            else
            {
                startGameResponse = new StartGameResponse
                {
                    Valid = true,
                    Waiting = true
                };
                users = new List<UserConnection> { new UserConnection(startGameRequest.User, connectionId) };
                _games[startGameRequest.GameCode] = users;
            }

            if (startGameResponse.Valid)
            {
                await Clients.Clients(users.Select(user => user.ConnectionId).ToArray()).StartGame(startGameResponse);
            }
            await Clients.Caller.StartGame(startGameResponse);
        }
    }
}
