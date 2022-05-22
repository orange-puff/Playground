namespace Playground.Web.Hubs
{
    public class UserConnection
    {
        public string User { get; }
        public string ConnectionId { get; }
        public UserConnection(string user, string connectionId)
        {
            User = user;
            ConnectionId = connectionId;
        }
    }
}
