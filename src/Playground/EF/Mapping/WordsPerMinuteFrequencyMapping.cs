using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Playground.Models;

namespace Playground.EF.Mapping
{
    public class WordsPerMinuteFrequencyMapping : IEntityTypeConfiguration<WordsPerMinuteFrequency>
    {
        public void Configure(EntityTypeBuilder<WordsPerMinuteFrequency> builder)
        {
            builder.ToTable("WordsPerMinuteFrequency");
            builder.HasKey(wpmf => wpmf.WordsPerMinute);
            builder.Property(wpmf => wpmf.WordsPerMinute)
                .IsRequired()
                .ValueGeneratedNever();
            builder.Property(wpmf => wpmf.Frequency)
                .IsRequired()
                .ValueGeneratedNever();
        }
    }
}
