using Microsoft.EntityFrameworkCore;
using SafeMind.Core.Entities;

namespace SafeMind.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // =========================
        // DbSets
        // =========================

        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<Professional> Professionals => Set<Professional>();
        public DbSet<ProfessionalAvailability> ProfessionalAvailabilities => Set<ProfessionalAvailability>();
        public DbSet<Appointment> Appointments => Set<Appointment>();
        public DbSet<VideoSession> VideoSessions => Set<VideoSession>();
        public DbSet<DiaryEntry> DiaryEntries => Set<DiaryEntry>();
        public DbSet<MoodEntry> MoodEntries => Set<MoodEntry>();
        public DbSet<Notification> Notifications => Set<Notification>();
        public DbSet<OtpVerification> OtpVerifications => Set<OtpVerification>();

        public DbSet<Assessment> Assessments => Set<Assessment>();
        public DbSet<AssessmentQuestion> AssessmentQuestions => Set<AssessmentQuestion>();
        public DbSet<AssessmentOption> AssessmentOptions => Set<AssessmentOption>();
        public DbSet<AssessmentResultRange> AssessmentResultRanges => Set<AssessmentResultRange>();

        // =========================
        // Model Configuration
        // =========================

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ---------- USER ----------
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Phone)
                .IsUnique();

            // ---------- ROLE ----------
            modelBuilder.Entity<Role>()
                .HasIndex(r => r.RoleName)
                .IsUnique();

            // ---------- PROFESSIONAL ----------
            modelBuilder.Entity<Professional>()
                .HasIndex(p => p.UserId)
                .IsUnique();

            modelBuilder.Entity<Professional>()
                .HasMany<ProfessionalAvailability>() // .HasMany(p => p.Availabilities) if nav property exists
                .WithOne(a => a.Professional)
                .HasForeignKey(a => a.ProfessionalId)
                .OnDelete(DeleteBehavior.Cascade);

            // ---------- AVAILABILITY ----------
            modelBuilder.Entity<ProfessionalAvailability>()
                .HasIndex(a => new { a.ProfessionalId, a.DayOfWeek });

            // ---------- APPOINTMENT ----------
            modelBuilder.Entity<Appointment>()
                .HasIndex(a => new { a.ProfessionalId, a.StartTime });

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Professional)
                .WithMany()
                .HasForeignKey(a => a.ProfessionalId)
                .OnDelete(DeleteBehavior.Restrict);

            // ---------- VIDEO SESSION ----------
            modelBuilder.Entity<VideoSession>()
                .HasIndex(v => v.RoomToken)
                .IsUnique();

            modelBuilder.Entity<VideoSession>()
                .HasOne(v => v.Appointment)
                .WithOne() // Assuming VideoSession has OneToOne with Appointment? 
                // Wait, VideoSession.cs has Appointment as property.
                // Java: VideoSession @OneToOne Appointment. Appointment doesn't mention VideoSession.
                // EF Core: need to configure this.
                .HasForeignKey<VideoSession>(v => v.AppointmentId)
                .OnDelete(DeleteBehavior.Cascade);

            // ---------- DIARY ----------
            modelBuilder.Entity<DiaryEntry>()
                .HasQueryFilter(d => !d.IsDeleted);

            // ---------- MOOD ----------
            modelBuilder.Entity<MoodEntry>()
                .HasIndex(m => new { m.UserId, m.EntryDate })
                .IsUnique();

            // ---------- NOTIFICATION ----------
            modelBuilder.Entity<Notification>()
                .HasIndex(n => new { n.UserId, n.IsRead });

            // ---------- OTP ----------
            modelBuilder.Entity<OtpVerification>()
                .HasIndex(o => o.UserId)
                .IsUnique();

            // ---------- ASSESSMENTS ----------
            modelBuilder.Entity<Assessment>()
                .HasMany<AssessmentQuestion>()
                .WithOne(q => q.Assessment)
                .HasForeignKey(q => q.AssessmentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AssessmentQuestion>()
                .HasMany<AssessmentOption>()
                .WithOne(o => o.Question)
                .HasForeignKey(o => o.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Assessment>()
                .HasMany<AssessmentResultRange>()
                .WithOne(r => r.Assessment)
                .HasForeignKey(r => r.AssessmentId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries<BaseEntity>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
