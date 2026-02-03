using SafeMind.Core.DTOs.Diary.Request;
using SafeMind.Core.DTOs.Diary.Response;
using SafeMind.Core.Entities;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace SafeMind.Infrastructure.Services
{
    public class DiaryService : IDiaryService
    {
        private readonly ApplicationDbContext _context;

        public DiaryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DiaryResponseDTO> CreateAsync(long userId, DiaryRequestDTO dto)
        {
            var diary = new DiaryEntry
            {
                UserId = userId,
                EncryptedText = dto.Text,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.DiaryEntries.Add(diary);
            await _context.SaveChangesAsync();

            return MapToDTO(diary);
        }

        public async Task<DiaryResponseDTO> UpdateAsync(long diaryId, long userId, DiaryRequestDTO dto)
        {
             var diary = await _context.DiaryEntries.FindAsync(diaryId);
            if (diary == null) throw new Exception("Diary not found");
            if (diary.UserId != userId) throw new Exception("Unauthorized");

            diary.EncryptedText = dto.Text;
            diary.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapToDTO(diary);
        }

        public async Task DeleteAsync(long diaryId, long userId)
        {
            var diary = await _context.DiaryEntries.FindAsync(diaryId);
            if (diary == null) throw new Exception("Diary not found");
            if (diary.UserId != userId) throw new Exception("Unauthorized");

            _context.DiaryEntries.Remove(diary);
            await _context.SaveChangesAsync();
        }

        public async Task<List<DiaryResponseDTO>> GetAllAsync(long userId)
        {
             return await _context.DiaryEntries
                .Where(d => d.UserId == userId && !d.IsDeleted)
                .OrderByDescending(d => d.CreatedAt)
                .Select(d => new DiaryResponseDTO
                {
                     DiaryId = d.DiaryId,
                     UserId = d.UserId,
                     Text = d.EncryptedText,
                     CreatedAt = d.CreatedAt,
                     UpdatedAt = d.UpdatedAt
                })
                .ToListAsync();
        }

        private DiaryResponseDTO MapToDTO(DiaryEntry diary)
        {
            return new DiaryResponseDTO
            {
                DiaryId = diary.DiaryId,
                UserId = diary.UserId,
                Text = diary.EncryptedText,
                CreatedAt = diary.CreatedAt,
                UpdatedAt = diary.UpdatedAt
            };
        }
    }
}
