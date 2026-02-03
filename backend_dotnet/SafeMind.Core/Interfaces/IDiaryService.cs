using SafeMind.Core.DTOs.Diary.Request;
using SafeMind.Core.DTOs.Diary.Response;

namespace SafeMind.Core.Interfaces
{
    public interface IDiaryService
    {
        Task<DiaryResponseDTO> CreateAsync(long userId, DiaryRequestDTO dto);
        Task<DiaryResponseDTO> UpdateAsync(long diaryId, long userId, DiaryRequestDTO dto);
        Task DeleteAsync(long diaryId, long userId);
        Task<List<DiaryResponseDTO>> GetAllAsync(long userId);
    }
}
