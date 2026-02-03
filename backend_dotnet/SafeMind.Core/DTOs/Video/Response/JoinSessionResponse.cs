namespace SafeMind.Core.DTOs.Video.Response
{
    public class JoinSessionResponse
    {
        public string RoomToken { get; set; }
        public string WsUrl { get; set; }
        public DateTime? AllowedFrom { get; set; }
        public DateTime? AllowedUntil { get; set; }

        public JoinSessionResponse(string roomToken, string wsUrl, DateTime? allowedFrom, DateTime? allowedUntil)
        {
            RoomToken = roomToken;
            WsUrl = wsUrl;
            AllowedFrom = allowedFrom;
            AllowedUntil = allowedUntil;
        }
    }
}
