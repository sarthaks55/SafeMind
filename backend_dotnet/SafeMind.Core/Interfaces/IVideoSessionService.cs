using SafeMind.Core.Entities;

namespace SafeMind.Core.Interfaces
{
    public interface IVideoSessionService
    {
        Task<VideoSession> CreateOrGetVideoSessionAsync(long appointmentId);
        Task MarkParticipantJoinedAsync(long videoSessionId, bool isProfessional);
        Task EndSessionAsync(long videoSessionId);
        Task<VideoSession> GetByIdAsync(long videoSessionId);
    }
}
