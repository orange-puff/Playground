using System.Threading.Tasks;
using Playground.Web.Models.ConnectFour;

namespace Playground.Web.Hubs.Clients
{
    public interface IConnectFourClient
    {
        Task StartGame(StartGameResponse startGameResponse);
    }
}
