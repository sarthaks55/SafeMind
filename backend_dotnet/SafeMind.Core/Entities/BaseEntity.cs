using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafeMind.Core.Entities
{
    public abstract class BaseEntity
    {
        [Column("created_on")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("last_updated")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
