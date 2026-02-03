using SafeMind.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace SafeMind.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context)
        {
            // Ensure database is created
            // await context.Database.EnsureCreatedAsync(); // Keep this if you want auto-creation

            // Check if we have assessments but no questions
            if (await context.Assessments.AnyAsync() && !await context.AssessmentQuestions.AnyAsync())
            {
                var assessments = await context.Assessments.ToListAsync();

                foreach (var assessment in assessments)
                {
                    // Add dummy questions based on title if possible, or generic ones
                    var questions = new List<AssessmentQuestion>();

                    if (assessment.Title != null && assessment.Title.Contains("Depression", StringComparison.OrdinalIgnoreCase))
                    {
                        questions.Add(CreateQuestion("Little interest or pleasure in doing things?"));
                        questions.Add(CreateQuestion("Feeling down, depressed, or hopeless?"));
                        questions.Add(CreateQuestion("Trouble falling or staying asleep, or sleeping too much?"));
                        questions.Add(CreateQuestion("Feeling tired or having little energy?"));
                    }
                    else if (assessment.Title != null && assessment.Title.Contains("Anxiety", StringComparison.OrdinalIgnoreCase))
                    {
                        questions.Add(CreateQuestion("Feeling nervous, anxious, or on edge?"));
                        questions.Add(CreateQuestion("Not being able to stop or control worrying?"));
                        questions.Add(CreateQuestion("Worrying too much about different things?"));
                        questions.Add(CreateQuestion("Trouble relaxing?"));
                    }
                    else
                    {
                        // Generic questions
                        questions.Add(CreateQuestion("How have you been feeling lately?"));
                        questions.Add(CreateQuestion("Have you been able to focus on your daily tasks?"));
                        questions.Add(CreateQuestion("How is your quality of sleep?"));
                    }

                    foreach (var q in questions)
                    {
                        q.AssessmentId = assessment.AssessmentId;
                        context.AssessmentQuestions.Add(q);
                    }
                }

                await context.SaveChangesAsync();
            }
        }

        private static AssessmentQuestion CreateQuestion(string text)
        {
            return new AssessmentQuestion
            {
                QuestionText = text,
                Options = new List<AssessmentOption>
                {
                    new AssessmentOption { OptionText = "Not at all", OptionValue = 0 },
                    new AssessmentOption { OptionText = "Several days", OptionValue = 1 },
                    new AssessmentOption { OptionText = "More than half the days", OptionValue = 2 },
                    new AssessmentOption { OptionText = "Nearly every day", OptionValue = 3 }
                }
            };
        }
    }
}
